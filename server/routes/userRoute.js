const express = require('express');
const router = express.Router();

// Define your routes here
const { registerUser } = require('../controllers/useController');
router.post('/register', registerUser);

const { loginUser } = require('../controllers/useController');
router.get('/login', loginUser);

module.exports = router;