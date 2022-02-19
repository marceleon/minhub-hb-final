const { Router } = require('express');
const client = require('../controller/clientController');
const account = require('../controller/accountController');

const router = new Router();

// Clientes
router.get('/clients', client.getClients);
router.get('/clients/:id', client.getOneClient);
router.get('/someclients', client.getSomeClients);
router.post('/client', client.newClient);

// Cuentas
router.get('/accounts', account.getAccounts);
router.get('/account/:id', account.getOneAccount);
router.post('/account', account.newAccount);

module.exports = router;
