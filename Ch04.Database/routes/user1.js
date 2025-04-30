var express = require("express");
var router = express.Router();
var mysql = require("mysql2");

const conn = require("../db/connection.js");

router.get("/list", function (req, res) {
  const sql = "select * from `user1`";

  conn.query(sql, (error, result, fields) => {
    if (error) {
      console.log("here1 : " + error);
    }
    res.render("user1/list", { users: result });
  });
});

router.get("/register", function (req, res) {
  res.render("user1/register");
});

router.post("/register", function (req, res) {
  const user = req.body;
  console.log("user : " + JSON.stringify(user));

  const sql = "insert into `user1` set ?";

  conn.query(sql, [user], (error, result) => {
    if (error) {
      console.log("here1 : " + error);
    }
    res.redirect("/user1/list");
  });
});

module.exports = router;
