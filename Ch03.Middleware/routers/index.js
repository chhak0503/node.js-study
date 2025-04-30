const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index"); // 템플릿 응답
});

module.exports = router;
