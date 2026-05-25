const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
   name: String,
    price: Number,
    image: String, 
    category: String,
    description: String,
    rating: Number,
    count: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);