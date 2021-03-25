const envConfig = require('./app/config/env');
const ENV = envConfig.getNormalizedEnv();

const PORT = 3001;

const express = require("express");
const helmet = require('helmet');
const app = express();
app.use(helmet());

const bodyParser = require("body-parser");

let apiV1Routes = require("./app/routes/v1");
let server = require('http').createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});

app.get('/', function(req, res){
    res.json("Objective API.");
});
app.use('/api/v1', apiV1Routes);

app.use(function(err, req, res, next) {
    console.log("Error: ", err);

    res.json({
        success: false,
        message: err.message,
        error: ENV === 'production' ? undefined : err
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("404", req.method, req.url);

    res.json({
        success: false,
        message: "404 - Not found."
    });
});

//------------------------------------------------------------------------------
//server start
//------------------------------------------------------------------------------
server.listen(PORT, function() {
    console.log("["+ENV+" - "+PORT+"] Objective API");
});

process.addListener("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});

module.exports = app;