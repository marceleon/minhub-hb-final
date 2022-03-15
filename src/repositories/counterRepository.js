const Counter = require('../models/counter');

// Actualizaciones
const next = async (clave) => {
    const id = '6226844951bcf8ace2336d75';
    const counter = await Counter.findOne({ id });
    console.log(counter);
    counter[clave] += 1;
    await Counter.updateOne({ _id: id }, counter);
    console.log(counter[clave]);
    return counter[clave];
};

module.exports = { next };
