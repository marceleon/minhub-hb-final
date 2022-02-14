const Client = require('../models/client');

const getAll = async () => { const r = await Client.find(); return r; };
const getOne = async (id) => { const r = await Client.findById(id); return r; };
const count = async () => { const r = await Client.count(); return r; };

module.exports = { getAll, getOne, count };
