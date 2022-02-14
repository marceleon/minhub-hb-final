const { Router } = require('express');
const getCli = require('../controller/clientController');

const router = new Router();
router.get('/clients', getCli.getClients);

module.exports = router;
