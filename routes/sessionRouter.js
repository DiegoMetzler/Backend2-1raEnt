const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/login', sessionController.login);
router.get('/current', sessionController.current);

module.exports = router;
