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
//e was npm init, npm express and npm morgan in terminal

//e middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));


//f add API routes. My data is in a different location (in public file)relative to the other files. SO BE CAREFUL WHEN routing the data
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");

});
//g add API routes
app.get("/api/notes", function (req, res) {
    //h readFile (read from the "server")
  res.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    //parse and pass data to the front end
    const notes = JSON.parse(data); 
    res.json(notes);
  });
});

//make out server listen and pass in PORT and a callback function as arguments
app.listen(PORT, function() {
console.log("app is listening on PORT: " + PORT);
});

//get data

//send data
