const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
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

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err) {
        console.log("Couldn't connect to mongodb");
        console.log(err);
        client.close();
    } else {
        console.log("Connected to Mongo!");
        const btdb = client.db("btd");

        try {
            const authrouter = require('./backend/auth/auth')(btdb)
            app.use(authrouter);

            const apirouter = require('./backend/routes/routes')(btdb);
            app.use('/api/v1/', apirouter);

            app.use(express.static(path.join(__dirname, 'client/dist')));
            app.get('*', (req, res) => {
                res.status(200).json({
                    // msg: process.env
                    msg: 'Catch all'
                })
            })

            app.listen(port, () => {
                console.log(`BACK_END_SERVICE_PORT: ${port}`);
            });

        } catch (err) {
            console.log("Error trying to set up server", err);
            client.close();
        }
    }
});



