const Product = require("../models/product.model");
const { validationProduct } = require("../utils/validation");

const addProduct = async (req, res) => {
  try {
    const { productName, productWidth, productHeight, productWeight } =
      req.body;

    validationProduct(req);

    const product = new Product({
      productName,
      productWidth,
      productHeight,
      productWeight,
    });

    await product.save();

    res.status(201).json({
      data: product,
      message: "Product created successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      productName,
      productWidth,
      productHeight,
      productWeight,
      product_id,
    } = req.body;

    validationProduct(req, true);

    const product = await Product.findByIdAndUpdate(
      product_id,
      { productName, productHeight, productWidth, productWeight },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        data: [],
        message: "Product not found!",
      });
    }

    res.status(200).json({
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.body;

    const product = await Product.findByIdAndDelete(product_id);

    if (!product) {
      return res.status(404).json({
        data: [],
        message: "Product not found!",
      });
    }

    res.status(200).json({
      data: [],
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct
};
