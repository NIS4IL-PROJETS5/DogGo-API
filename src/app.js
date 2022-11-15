const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MONGO_URI } = process.env;

mongoose
  .connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true } // useNewUrlParser ? : https://stackoverflow.com/a/65158413, useUnifiedTopology ? : https://mongoosejs.com/docs/5.x/docs/deprecations.html#useunifiedtopology
  )
  .then(() => console.log("🍀 Connected to MongoDB"))
  .catch(() => console.log("❌ Failed to connect to MongoDB"));

const app = express(); // create a new instance of express

app.use(express.json()); // parse the data from the request body

// CORS headers for all routes
app.use((_req, res, next) => {
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

const db = require("./util/mysql.connect"); // import the database connection
db.sequelize.sync();

// mysql routes
app.use("/api/actualites", require("./routes/actualite.routes"));
app.use("/api/adherents", require("./routes/adherent.routes"));
app.use("/api/contacts", require("./routes/contact.routes"));

// mongo routes
app.use("/api/auth", require("./routes/user.routes"));

module.exports = app;
