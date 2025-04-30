const mysql = require("mysql2"); // mysql로 하면 에러남 꼭 mysql2로 해야됨

const conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "java1db",
});

module.exports = conn;
