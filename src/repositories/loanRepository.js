const Loan = require('../models/loan');
const Client = require('../models/client');
const LineLoan = require('../models/lineloan');
const Account = require('../models/account');
const TrnRepo = require('./transactionRepository');

// Consultas
const getAll = async () => { const r = await Loan.find(); return r; };
const getOne = async (id) => { const r = await Loan.findById(id); return r; };

// Actualizaciones
const save = async (body) => {
    const loan = new Loan({
        lineLoan: body.lineLoan,
        client: body.client,
        amount: body.amount,
        payments: body.payments,
    });

    loan.save();

    const line = await LineLoan.findById(loan.lineLoan);
    line.loans.push(loan._id);
    await LineLoan.updateOne(
        { _id: line._id },
        { loans: line.loans },
    );

    const client = await Client.findById(loan.client);
    client.loans.push(loan._id);
    await Client.updateOne(
        { _id: client._id },
        { loans: client.loans },
    );

    return loan;
};

// Actualizaciones
const saveAndDeposit = async (body) => {
    const {
        account, lineLoan, amount, payments,
    } = body;

    console.log(1);
    const acc = await Account.findOne({ number: account });
    console.log(2);
    const line = await LineLoan.findById(lineLoan);
    console.log(3);

    console.log(acc);
    console.log(line);

    if (acc && line) {
        const ln = {
            lineLoan,
            client: acc.client,
            amount,
            payments,
        };
        save(ln);

        const trn = {
            type: 'C',
            description: `${line.name}-${line.type}`,
            amount,
            account: acc._id,
        };

        const deposito = TrnRepo.save(trn);
        return deposito;
    }
};

module.exports = {
    getAll, getOne, save, saveAndDeposit,
};
