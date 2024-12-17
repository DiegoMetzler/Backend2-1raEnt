const express = require('express');
const productController = require('../controllers/productController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), productController.createProduct);

module.exports = router;
