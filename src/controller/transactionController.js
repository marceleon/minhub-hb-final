const { getTransactions } = require('../usrCase/getTransactions');
const { newTransaction, transfer } = require('../usrCase/newTransaction');

module.exports = {
    getTransactions, newTransaction, transfer,
};
