// require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || "todo_list",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    options: {
      dialect: process.env.DIALECT || "mysql",
      host: process.env.HOST || "localhost",
      pool: {
        max: 10,
        min: 0,
        acquire: 90000,
        idle: 10000,
      },
    },
  },
};
