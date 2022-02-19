const Account = require('../models/account');
const Client = require('../models/client');

// Consultas
const getAll = async () => { const r = await Account.find(); return r; };
const getOne = async (id) => { const r = await Account.findById(id); return r; };
const count = async () => { const r = await Account.count(); return r; };

// Actualizaciones
const saveInit = async (body) => {
    const account = new Account({
        number: body.number,
        creationDate: body.creationDate,
        balance: body.balance,
    });

    account.save();
    return account;
};

const save = async (body) => {
    const account = new Account({
        number: body.number,
        client: body.client,
    });

    await account.save();
    console.log(account);
    const client = await Client.findById(account.client);
    const acc = client.accounts;
    acc.push(account._id);
    console.log(client);
    await Client.updateOne({ _id: client._id }, { accounts: acc });

    return account;
};

module.exports = {
    getAll, getOne, count, saveInit, save,
};
