const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const pool = require('./db');

const PORT = process.env.PORT || 5000

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.post('/upload', (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    var files = req.files;
    var fileKeys = Object.keys(req.files);

    fileKeys.forEach( async function (key) {
        let file = files[key];
        let fileType = file.name.split('.').pop();
        let fileName = `${key}.${fileType}`;
        let filePath = `${__dirname}/uploads/${fileName}`;

        file.mv(filePath, err => {
            if(err) {
                console.log(err);
                return res.status(500).send(err);
            }
        });

        if(fileType === 'csv') {
            console.log("CSV")
            pool.query(`INSERT INTO output_files (path) VALUES ('${filePath}');`)
        }
    });
});

app.post('/output', async (req, res) => {
    await pool.query("SELECT path FROM output_files;")
        .then((data) => {
            const results = [];
            const filePath = data.rows[0].path

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    Object.keys(results[0]).forEach((column) => {
                        pool.query(`ALTER TABLE output_data ADD COLUMN ${column} double precision`)
                    })
                    pool.query(`COPY output_data FROM '${filePath}' DELIMITER ',' CSV HEADER;`)
            });

        }).catch(error => {
            console.log("No data files generated.");
        });
})

app.get('/simulation', async (req, res) => {
    await pool.query("SELECT * FROM output_data;")
        .then((data) => {
            console.log(data.rows)
            res.json(data.rows)
        }).catch(error => {
            console.log(error);
        });
})

app.listen(PORT, () => console.log("Server started..."));