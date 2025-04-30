var express = require("express");
const User2 = require("../schemas/user2");
var router = express.Router();

router.get("/list", async (req, res) => {
  const users = await User2.find();
  console.log(users);
  res.render("user2/list", { users });
});

router.get("/register", (req, res) => {
  res.render("user2/register");
});

router.post("/register", async (req, res) => {
  //const user = req.body;

  // mongoDB Insert
  const user2 = new User2(req.body);
  await user2.save();
  console.log(user2);

  res.redirect("/user2/list");
});

router.get("/modify", async (req, res) => {
  const _id = req.query._id;
  console.log("_id : " + _id);

  const user = await User2.findById(_id);
  console.log("user : " + user);

  res.render("user2/modify", { user });
});

router.post("/modify", async (req, res) => {
  const { _id, uid, name, hp, age } = req.body;

  await User2.findByIdAndUpdate(_id, { name, hp, age });
  res.redirect("/user2/list");
});

router.get("/delete", async (req, res) => {
  const _id = req.query._id;
  console.log("_id : " + _id);

  await User2.deleteOne({ _id });
  res.redirect("/user2/list");
});

module.exports = router;
