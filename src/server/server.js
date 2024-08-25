const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

const port = 8081;

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

let projectData = {};

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/addData', (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    res.send({ success: true, data: projectData });
});