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
    var files = req.files;

    if(files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

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
            pool.query(`INSERT INTO output_files (file_path) VALUES ('${filePath}');`)
        }
    });
});

app.post('/columns', async (req, res) => {
    await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name='${req.body.table}';`)
        .then((data) => {
            res.json(data.rows)
        }).catch(error => {
            console.log(error);
        });
});

app.listen(PORT, () => console.log("Server started..."));