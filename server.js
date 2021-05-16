const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

const apirouter = require('./backend/routes/routes');
app.use('/api/v1/', apirouter);

app.use(express.static(path.join(__dirname, 'client/dist')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/dist/index.html'));
// })

app.get('*', (req, res) => {
    res.status(200).json({
        // msg: process.env
        msg: 'Catch all'
    })
})

app.listen(port, () => {
    console.log(`BACK_END_SERVICE_PORT: ${port}`);
});


