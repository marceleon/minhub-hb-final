const { Router } = require('express');
const usr = require('../controller/userController');
const router = new Router();

// Usuarios
router.post('/login', usr.login);
router.post('/user', usr.newUser);

module.exports = router;
