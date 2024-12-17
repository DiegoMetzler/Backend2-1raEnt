const express = require('express');
const sessionController = require('../controllers/sessionController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', sessionController.login);
router.get('/current', authMiddleware, sessionController.getCurrentUser);

module.exports = router;
