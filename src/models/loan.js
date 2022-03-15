const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({

    lineLoan: { type: mongoose.Schema.Types.ObjectId, ref: 'lineloan', autopopulate: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    grating_date: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    payments: { type: Number, required: true },

});

loanSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('loan', loanSchema);
