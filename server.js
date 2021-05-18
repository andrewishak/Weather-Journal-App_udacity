// Setup empty JS object to act as endpoint for all routes
projectData = {};

const port = 3000;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const server = app.listen(port, () => {
    console.log(`server is listening on port: ${port}`); 
});
// Callback function to complete GET '/all'
app.get('/all',(req,res) => {
    res.send(projectData);
});

// Post Route
app.post('/addWeatherData',(req,res) => {
    const body = req.body;
    projectData.temperature = body.temperature;
    projectData.date = body.date;
    projectData.feelings = body.feelings;
    res.send('success');
});