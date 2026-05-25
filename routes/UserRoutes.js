const express = require("express");
const User = require("../models/User");

const router = express.Router();


// CREATE PRODUCT
router.post("/product", async (req, res) => {
  try {
    const product = await User.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await User.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET SINGLE PRODUCT
router.get("/product/:id", async (req, res) => {
  try {
    const product = await User.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE PRODUCT
router.put("/updateProduct/:id", async (req, res) => {
  try {
    const product = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE PRODUCT
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const product = await User.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;