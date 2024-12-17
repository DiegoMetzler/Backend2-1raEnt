const cartService = require('../services/cartService');
const productService = require('../services/productService');
const ticketService = require('../services/ticketService');

module.exports.purchaseCart = async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartService.getCartById(cartId);

    res.json({ message: 'Compra realizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
