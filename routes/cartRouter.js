const express = require('express');
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/:cid/purchase', authMiddleware, cartController.purchaseCart);

module.exports = router;
