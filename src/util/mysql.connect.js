const Sequelize = require("sequelize");
require("dotenv").config();
const {
  MYSQL_ADRESS,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_ADRESS,
  port: MYSQL_PORT,
  dialect: "mysql",
  logging: false, // disable the console.log of the queries
  pool: {
    max: 10, // maximum number of connections
    min: 0,
    idle: 10000, // maximum time, in milliseconds, that a connection can be idle before being released
  },
});

if (sequelize.authenticate()) {
  // check if the connection is established
  setTimeout(() => {
    console.log("🐬 Connected to MySQL");
  }, 1000);
} else {
  console.log("❌ Failed to connect to MySQL");
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.actualites = require("../models/Actualite")(sequelize, Sequelize);
db.adherents = require("../models/Adherent")(sequelize, Sequelize);

module.exports = db;
