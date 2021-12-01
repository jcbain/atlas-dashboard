const express = require('express');
const router = express.Router();
const pool = require('../../db');

router
    .route("/parameters")
    .get(async (req, res) => {
        await pool.query(`SELECT * FROM selection`)
            .then((data) => {
                res.json(data.rows);
            }).catch(error => {
                console.log(error);
            });
    }
);

router
    .route("/data")
    .get(async (req, res) => {
        let qstring = req.query.filter;
        
        await pool.query(
            `SELECT x, y, color FROM visual
            WHERE param_id=
            (SELECT id FROM selection
            WHERE ${qstring});`)
                .then((data) => {
                    res.json(data.rows);
                }).catch(error => {
                    console.log(error);
                });
    }
);

module.exports = router;
