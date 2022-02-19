const { getAccounts, getOneAccount } = require('../usrCase/getAccounts');
const { newAccount } = require('../usrCase/newAccount');

module.exports = {
    getAccounts, getOneAccount, newAccount,
};
