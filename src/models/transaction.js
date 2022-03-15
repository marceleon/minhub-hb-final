const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    type: { type: String, required: true, enum: ['D', 'C'] },
    description: { type: String, default: 'N/A' },
    date: { type: Date, default: Date.now },
    amount: { type: Number, default: 0 },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'account' },

});

module.exports = mongoose.model('transaction', transactionSchema);
