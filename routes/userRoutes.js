const express = require("express");
const User = require("../models/User");

const router = express.Router();

// CREATE
router.post("/product", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// READ ALL
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// READ ONE
router.get("/product/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// UPDATE
router.put("/updateProduct/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(user);
});

// DELETE
router.delete("/deleteProduct/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User Deleted",
  });
});

module.exports = router;