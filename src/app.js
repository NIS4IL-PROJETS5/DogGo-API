const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();
const {
  MONGO_URI,
  MYSQL_ADRESS,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

const userRoutes = require("./routes/user"); // import the user routes

mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true } // useNewUrlParser ? : https://stackoverflow.com/a/65158413, useUnifiedTopology ? : https://mongoosejs.com/docs/5.x/docs/deprecations.html#useunifiedtopology
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(() => console.log("❌ Failed to connect to MongoDB"));

const con = mysql.createConnection({
  host: MYSQL_ADRESS,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

const app = express(); // create a new instance of express

app.use(express.json()); // parse the data from the request body

// CORS headers for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json()); // parses the json data sent to the server

app.use("/api/auth", userRoutes); // use the user routes

module.exports = app;
