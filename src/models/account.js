const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    number: { type: String, unique: true, required: true },
    creationDate: { type: Date, default: Date.now },
    balance: { type: Number, default: 0 },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transaction', autopopulate: true }],

});

accountSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('account', accountSchema);
