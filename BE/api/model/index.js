const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  img: {
    type: Array,
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model("item", itemSchema);
