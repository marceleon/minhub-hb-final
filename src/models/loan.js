const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({

    type: { type: String, required: true },

});

module.exports = mongoose.model('loan', loanSchema);
