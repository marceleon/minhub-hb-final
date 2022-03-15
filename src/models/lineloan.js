const mongoose = require('mongoose');

const lineLoanSchema = new mongoose.Schema({

    type: { type: String, required: true },
    name: { type: String, required: true },
    maxAmount: { type: Number, required: true },
    installments: [{ type: Number, required: true }],
    loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'loan' }],

});

module.exports = mongoose.model('lineloan', lineLoanSchema);
