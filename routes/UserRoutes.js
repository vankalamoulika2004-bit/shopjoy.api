const express = require("express");
const path = require("path");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  }),
  fileFilter: imageFileFilter,
});

const uploadMemory = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
});


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

// UPLOAD OR UPDATE PRODUCT IMAGE
router.post("/product/:id/image", upload.single("image"), async (req, res) => {
  try {
    const product = await User.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    product.image = imageUrl;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPLOAD OR UPDATE PRODUCT IMAGE IN DATABASE
router.post(
  "/product/:id/image-db",
  uploadMemory.single("image"),
  async (req, res) => {
    try {
      const product = await User.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "No image uploaded",
        });
      }

      product.imageData = req.file.buffer;
      product.imageContentType = req.file.mimetype;
      await product.save();

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// RETURN IMAGE DIRECTLY FROM DATABASE
router.get("/product/:id/image", async (req, res) => {
  try {
    const product = await User.findById(req.params.id);

    if (!product || !product.imageData) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.set("Content-Type", product.imageContentType || "image/jpeg");
    res.send(product.imageData);
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