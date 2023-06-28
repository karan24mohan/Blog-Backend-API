const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: "String",
  description: "String",
  image: "String",
  author: "String",
});

module.exports = mongoose.model("blogs", blogSchema);
