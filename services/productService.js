const Product = require('../models/Product');

const getProductById = async (id) => {
  return await Product.findById(id);
};

const updateProductStock = async (id, newStock) => {
  return await Product.findByIdAndUpdate(id, { stock: newStock }, { new: true });
};

const createProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

module.exports = { getProductById, updateProductStock, createProduct };
