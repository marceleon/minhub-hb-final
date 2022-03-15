const { getAllCards, getCards, getOneCard } = require('../usrCase/getCards');
const { newCard } = require('../usrCase/newCard');

module.exports = {
    getAllCards, getCards, getOneCard, newCard,
};
