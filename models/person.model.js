const mongoose = require("mongoose");

var personSchema = {
  name: String,
  year: Number,
  email: String,
  gender: String,
  phone: String,
};
var Person = mongoose.model("Person", personSchema, "person");
module.exports = Person;
