const express = require("express");
const router = express.Router();

router.get("/get1", (req, res) => {
  const data = {
    uid: req.query.uid,
  };
  console.log("data : " + JSON.stringify(data));
  res.render("sub1/get1", data);
});

router.get("/get2", (req, res) => {
  const data = {
    name: req.query.name,
    age: req.query.age,
  };
  console.log("data : " + JSON.stringify(data));
  res.render("sub1/get2", data);
});

module.exports = router;
