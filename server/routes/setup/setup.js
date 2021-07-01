const express = require('express');
const router = express.Router();
const pool = require('../../db');
const { dockerCommand } = require('docker-cli-js');
const { saveFiles, dumpCSV } = require('./fileHandler');

const options = {
    machineName: null,
    currentWorkingDirectory: null,
    echo: true,
};

router
    .route("/upload")
    .post(async(req, res) => {
        let isCSV = saveFiles(req.files);

        if (!isCSV) {
            dockerCommand('exec descartes ./start.sh', options)
            .then(()=> {
                dumpCSV().then(res.end());
            }).catch((error) => {
                console.log(error);
            });

        } else {
            dumpCSV().then(res.end());
        }
    }
);

router
    .route("/variables")
    .get(async (req, res) => {
        await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name='raw_data';`)
            .then((data) => {
                res.json(data.rows);
            }).catch(error => {
                console.log(error);
            });
    }
);

router
    .route("/tables")
    .post(async (req, res) => {
        let visuals = req.body;
        let params = visuals.params;

        let queryState = params.map( p => (`R.${p}=S.${p}`));

        await params.forEach( async(col) => {
            await pool.query(
                `ALTER TABLE selection
                ADD COLUMN IF NOT EXISTS ${col} double precision;`)
        })

        await pool.query(
            `INSERT INTO selection (${params.toString()})
            SELECT DISTINCT ${params.toString()}
            FROM raw_data;`)

        pool.query(
            `INSERT INTO visual (param_id, x, y, color)
            SELECT S.id, ${visuals.x}, ${visuals.y}, ${visuals.color}
            FROM raw_data R, selection S
            WHERE ${queryState.join(' AND ')};`
        ).then(() => res.end() )
    }
);

module.exports = router;