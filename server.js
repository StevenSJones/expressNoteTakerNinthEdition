//1 - build express server
//a - node modules that are built in (no terminal install)
const fs = require("fs");

//b - npm modules that are downloaded (terminal install)
const express = require("express");
const logger = require("morgan");
const { v4: uuidv4 } = require("uuid"); //k to generate a unique id we import uuid

//l to generate a unique id we invoke the id funciton uuidv4() below
const note = {
  id: uuidv4(),
  title: "Hello",
  text: "World!",
};

//c calling express
const app = express();
//d creating a port
const PORT = 8080;
//e was npm init, npm express and npm morgan in terminal

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static("public")); //builds a route for every file in the public directory.

//f add HTML route. My data is in a different location (in public file)relative to the other files. SO BE CAREFUL WHEN routing the data
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

//HTML route for the notes.html page
app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});

//g add API routes
app.get("/api/notes", function (req, res) {
  //h readFile (read from the "server")
  fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    //i parse and pass data to the front end
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

//m api route for post. this adds a unique id to the note
app.post("/api/notes", function (req, res) {
  //n readFile (read from the "server")
  res.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
    //n parse data
    const notes = JSON.parse(data);
    //push parsed data to parsed data array
    notes.push(note);
    //stringify data
    const stringifiedData = JSON.stringify(notes, null, 2);
    //write to server
    fs.writeFile("/db/db.json", stringifiedData, function () {
      //n pass data to the front end
      res.json(note);
    });
  });
  const note = {
    id: uuidv4(), //add unique id to the data that we get back
    ...req.body,
  };
});

app.all("*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
  console.log("THis far");
});

//j make out server listen and pass in PORT and a callback function as arguments
app.listen(PORT, function () {
  console.log("app is listening on PORT: " + PORT);
});

//get data

//send data
