const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    number: { type: String, unique: true, required: true },
    creationDate: { type: Date, required: true, default: Date.now },
    balance: { type: Number, required: true, default: 0 },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },

});

module.exports = mongoose.model('account', accountSchema);
