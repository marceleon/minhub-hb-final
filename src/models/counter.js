const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({

    nextAccount: { type: Number, required: true, default: 0 },

});

module.exports = mongoose.model('counter', counterSchema);
