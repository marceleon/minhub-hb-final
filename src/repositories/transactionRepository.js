const Account = require('../models/account');
const Trnansaction = require('../models/transaction');

// Consultas
const getOne = async (id) => { const r = await Trnansaction.findById(id); return r; };

// Actualizaciones
const save = async (body) => {
    const trn = new Trnansaction({
        type: body.type,
        description: body.description,
        amount: body.amount * (body.type === 'C' ? 1 : -1),
        account: body.account,
    });

    console.log(body);

    await trn.save();
    const account = await Account.findById(trn.account);
    account.transactions.push(trn._id);
    account.balance += trn.amount;
    await Account.updateOne(
        { _id: account._id },
        { balance: account.balance, transactions: account.transactions },
    );

    trn.save();
    return trn;
};

const transfer = async (body) => {
    const {
        fromNumber, toNumber, amount, description,
    } = body;

    const fromAcc = await Account.findOne({ number: fromNumber });
    const toAcc = await Account.findOne({ number: toNumber });

    console.log(fromNumber, toNumber);
    console.log(fromAcc),
    console.log(toAcc);

    if (fromAcc || toAcc) {
        let bdy = {
            account: fromAcc._id,
            type: 'D',
            description: `TO ${toNumber}: ${description}`,
            amount,
        };
        await save(bdy);

        bdy = {
            account: toAcc._id,
            type: 'C',
            description: `from ${fromNumber}: ${description}`,
            amount,
        };
        await save(bdy);

        return { menssage: 'Transferencia realizada con Exito' };
    }
};

module.exports = {
    getOne, save, transfer,
};
