const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const setupRouter = require('./routes/setup/setup')
const dashboardRouter = require('./routes/dashboard/dashboard')

const app = express();
const PORT = process.env.PORT || 5000

app.use(fileUpload());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/setup', setupRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () => console.log("Server started..."));

module.exports = app;