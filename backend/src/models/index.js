const Sequelize = require("sequelize");
const config = require("../config/mysql-config");
const db = {};
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
