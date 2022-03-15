const LineLoan = require('../models/lineloan');

// Consultas
const getAll = async () => { const r = await LineLoan.find(); return r; };
const getOne = async (id) => { const r = await LineLoan.findById(id); return r; };

// Actualizaciones
const save = async (body) => {
    const line = new LineLoan({
        type: body.type,
        name: body.name,
        maxAmount: body.maxAmount,
        installments: body.installments,
    });

    line.save();
    return line;
};

module.exports = {
    getAll, getOne, save,
};
