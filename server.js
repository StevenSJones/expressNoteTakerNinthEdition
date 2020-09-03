//1 - build express server
//a - node modules that are built in (no terminal install)
const fs = require("fs");

//b - npm modules that are downloaded (terminal install)
const express = require("express");
const logger = require("morgan");

//e middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

//c calling express
const app = express();
//d creating a port
const PORT = 8080;

//add routes. My data is in a different location relative to the other files. SO BE CAREFUL WHEN routing the data


//get data

//send data

