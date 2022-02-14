const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    descrip: { type: String, default: 'N/A' },
    date: { type: Date, default: Date.now },
    amonunt: { type: Number, default: 0 },

});

module.exports = mongoose.model('loan', transactionSchema);
