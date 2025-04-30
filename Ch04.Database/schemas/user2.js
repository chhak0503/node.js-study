const mongoose = require("mongoose");

const { Schema } = mongoose;
const user2Schema = new Schema({
  uid: { type: String, require: true },
  name: { type: String, require: true },
  hp: { type: String },
  age: { type: Number },
});

module.exports = mongoose.model("User2", user2Schema);
