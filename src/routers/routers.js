const { Router } = require('express');

const usr = require('../controller/userController');
const client = require('../controller/clientController');
const account = require('../controller/accountController');
const transaction = require('../controller/transactionController');
const lineLoan = require('../controller/lineloanController');
const loan = require('../controller/loanController');
const card = require('../controller/cardController');

const router = new Router();

// Usuarios
router.post('/login', usr.login);
router.post('/user', usr.newUser);

// Clientes
router.get('/clients', client.getClients);
router.get('/clients/:id', client.getOneClient);
router.get('/clients/:id/cards', card.getCards);
router.get('/clients/:id/accounts', account.getAccounts);
router.get('/someclients', client.getSomeClients);
router.post('/client', client.newClient);

// Cuentas
router.get('/allaccounts', account.getAllAccounts);
router.get('/account/:id', account.getOneAccount);
router.post('/account', account.newAccount);

// Transactions
router.get('/trn/:id', transaction.getTransactions);
router.post('/trn', transaction.newTransaction);
router.post('/transfer', transaction.transfer);

// Lines
router.get('/lines', lineLoan.getLineLoans);
router.get('/lines/:id', lineLoan.getOneLineLoan);
router.post('/line', lineLoan.newLineLoan);

// Loans
router.get('/loans', loan.getLoans);
router.post('/loan', loan.newLoan);
router.post('/loananddep', loan.newLoanAndDeposit);

// Cards
router.get('/allcards', card.getAllCards);
router.get('/cards/:id', card.getOneCard);
router.post('/card', card.newCard);

module.exports = router;
