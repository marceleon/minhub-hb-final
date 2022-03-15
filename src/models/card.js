const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

    number: { type: Number, unique: true, required: true },
    cardHolder: { type: String, required: true },
    type: { type: String, required: true, enum: ['DEBIT', 'CREDIT'] },
    color: { type: String, required: true, enum: ['GOLD', 'SILVER', 'TITANIUM'] },
    fromDate: { type: Date, required: true },
    thruDate: { type: Date, required: true },
    cvv: {
        type: Number, required: true, min: 0, max: 999,
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
});

module.exports = mongoose.model('card', cardSchema);
