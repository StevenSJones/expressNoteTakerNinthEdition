//1 - build express server
//a - node modules that are built in (no terminal install)
const fs = require("fs");

//b - npm modules that are downloaded (terminal install)
const express = require("express");
const logger = require("morgan");

//c calling express
const app = express();
//d creating a port
const PORT = 8080;

//e middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));


//add routes. My data is in a different location (in public file)relative to the other files. SO BE CAREFUL WHEN routing the data
app.get("/", function(req, res) {
    fs.sendFile(__dirname + "/public/index.html");

});

app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
      //read from the "server"
    const notes = JSON.parse(data); //parse and pass data to the front end
    res.json(notes);
  });
});

//get data

//send data
