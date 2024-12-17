const Cart = require('../models/Cart');

const getCartById = async (cartId) => {
  return await Cart.findById(cartId).populate('products.product');
};

const updateCart = async (cartId, updatedData) => {
  return await Cart.findByIdAndUpdate(cartId, updatedData, { new: true });
};

module.exports = { getCartById, updateCart };
