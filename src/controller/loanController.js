const { getLoans, getOneLoan } = require('../usrCase/getLoans');
const { newLoan, newLoanAndDeposit } = require('../usrCase/newLoan');

module.exports = {
    getLoans, getOneLoan, newLoan, newLoanAndDeposit,
};
