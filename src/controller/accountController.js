const { getAllAccounts, getAccounts, getOneAccount } = require('../usrCase/getAccounts');
const { newAccount } = require('../usrCase/newAccount');

module.exports = {
    getAllAccounts, getAccounts, getOneAccount, newAccount,
};
