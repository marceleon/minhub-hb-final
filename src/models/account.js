const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    type: { type: String, required: true },

});

module.exports = mongoose.model('account', accountSchema);
