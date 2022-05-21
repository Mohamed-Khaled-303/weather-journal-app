// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// Spin up the server
const port = 8080;

app.listen(port, () => {
    console.log(`server is running on: localhost:${port}`);
})


// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData)
});


// Post Route
app.post('/add', (req, res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    }
});

