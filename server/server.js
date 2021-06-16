const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors');
const pool = require('./db');

const PORT = process.env.PORT || 5000

app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.post('/upload', async(req, res) => {
    let files = req.files;

    if(files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    let fileKeys = Object.keys(req.files);

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
    });
});

app.get('/columns', async (req, res) => {
    await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name='${req.body.table}';`)
        .then((data) => {
            res.json(data.rows);
        }).catch(error => {
            console.log(error);
        });
});

app.post('/parameters', async (req, res) => {
    let params = req.body.params;
    let visuals = req.body.visuals;
    let queryState = params.map( p => (`R.${p}=S.${p}`));

    await params.forEach( (col) => {
        pool.query(
            `ALTER TABLE selection
            ADD COLUMN IF NOT EXISTS ${col} double precision;`)
        console.log(col)
    })

    await pool.query(
        `INSERT INTO selection (${params.toString()})
        SELECT DISTINCT ${params.toString()}
        FROM raw_data;`)    

    await pool.query(
        `INSERT INTO visual (v_id, x, y, color)
        SELECT S.id, ${visuals.x}, ${visuals.y}, ${visuals.color}
        FROM raw_data R, selection S
        WHERE ${queryState.join(' AND ')};`)
});

app.listen(PORT, () => console.log("Server started..."));