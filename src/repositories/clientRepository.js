const Client = require('../models/client');

// Consultas
const getAll = async () => { const r = await Client.find(); return r; };
const getOne = async (id) => { const r = await Client.findById(id); return r; };
const count = async () => { const r = await Client.count(); return r; };

const getSome = async (ids) => { const r = await Client.find(ids); return r; };

// Actualizaciones
const save = async (body) => {
    const client = new Client({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
    });

    client.save();
    return client;
};

module.exports = {
    getAll, getSome, getOne, count, save,
};
