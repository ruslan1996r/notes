const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const { auth } = require('../middlewares/auth');

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', auth, UserController.getMe)

module.exports = router