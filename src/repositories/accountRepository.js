const Account = require('../models/account');
const Client = require('../models/client');
const counterRepo = require('./counterRepository');

// Consultas
const getAll = async () => { const r = await Account.find(); return r; };
const getAccounts = async (criterio) => { const r = await Account.find(criterio); return r; };
const getOne = async (id) => { const r = await Account.findById(id); return r; };
const count = async () => { const r = await Account.count(); return r; };

const azar = (min, max) => Math.trunc(Math.random() * (max - min) + min);

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
    let { number: num } = body;

    if (!num) {
        const nro = await counterRepo.next('nextAccount');
        console.log(nro);
        num = `VIN${nro.toString().padStart(6,'0')}`;
        console.log(num);
    }

    const account = new Account({
        number: num,
        client: body.client,
    });

    await account.save();
    const client = await Client.findById(account.client);
    const acc = client.accounts;
    acc.push(account._id);
    await Client.updateOne({ _id: client._id }, { accounts: acc });

    return account;
};

module.exports = {
    getAll, getAccounts, getOne, count, saveInit, save,
};
