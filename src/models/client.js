const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({

    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'account', autopopulate: true }],
    loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'loan', autopopulate: true }],
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'card', autopopulate: true }],

});

clientSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('client', clientSchema);
