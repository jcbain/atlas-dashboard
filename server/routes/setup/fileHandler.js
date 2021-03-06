const pool = require('../../db');
const csv = require('csv-parser');
const fs = require('fs');

const root = "/usr/src/uploads/";

const saveFiles = (files) => {
    let isCSV = false;
    let fileKeys = Object.keys(files);

    fileKeys.forEach( async function (key) {
        let file = files[key];
        let fileType = file.name.split('.').pop();
        let fileName = `${key}.${fileType}`;
        let filePath = `${root}${fileName}`;

        file.mv(filePath, err => {
            if(err) {
                console.log(err);
                return res.status(500).send(err);
            }
        });

        if ((fileType) === "csv") {
            isCSV = true;
        }
    });

    return isCSV;
}

const dumpCSV = async () => {
    const csvFiles = await getCsv(root);

    csvFiles.forEach((file) => {
        csvToTable(file);
    });
}

async function csvToTable(file) {
    const results = [];

    fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            let header = Object.keys(results[0]);

            header.forEach((column) => {
                pool.query(
                    `ALTER TABLE raw_data
                    ADD COLUMN IF NOT EXISTS
                    ${column} double precision`
                )
            });
            pool.query(`COPY raw_data (${header.join()}) FROM '${file}' DELIMITER ',' CSV HEADER;`);
        });
}

async function getCsv(path) {
    let csvFiles = []
    const items = await fs.promises.readdir(path, { withFileTypes: true });

    for (const item of items) {
        const newPath = `${path}${item.name}`
        if (item.isDirectory()) {
            csvFiles = csvFiles.concat(
                    await getCsv(`${newPath}/`)
                );
            
        } else if (newPath.slice(-4) === ".csv") {
            csvFiles.push(newPath);
        }
    };

    return csvFiles;
}

module.exports = { saveFiles, dumpCSV, csvToTable }