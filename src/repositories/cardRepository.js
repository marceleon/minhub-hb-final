const Card = require('../models/card');
const Client = require('../models/client');

// Consultas
const getAll = async () => { const r = await Card.find(); return r; };
const getCards = async (criterio) => { const r = await Card.find(criterio); return r; };
const getOne = async (id) => { const r = await Card.findById(id); return r; };
const count = async () => { const r = await Card.count(); return r; };

// Actualizaciones

const azar = (min, max) => Math.trunc(Math.random() * (max - min) + min);

const save = async (body) => {
    let {
        number, fromDate, thruDate, cvv,
    } = body;
    const cli = await Client.findById(body.client);

    if (!number) {
        let prefijo = 0;
        switch (body.color) {
        case 'SILVER':
            prefijo = 3030;
            break;
        case 'GOLD':
            prefijo = 5050;
            break;
        case 'TITANIUM':
            prefijo = 9090;
            break;
        default:
            prefijo = 1010;
            break;
        }
        number = `${prefijo}${azar(0, 9999).toString().padStart(4,'0')}${azar(0, 9999).toString().padStart(4,'0')}${azar(0, 9999).toString().padStart(4, '0')}`;
    }

    if (!fromDate) {
        const hoy = new Date(Date.now());
        fromDate = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        thruDate = new Date(hoy.getFullYear() + 3, hoy.getMonth(), 1);
    }

    if (!cvv) cvv = azar(0, 999);

    console.log(cvv);

    const card = new Card({
        number,
        cardHolder: `${cli.firstName} ${cli.lastName}`.toUpperCase(),
        type: body.type,
        color: body.color,
        fromDate,
        thruDate,
        cvv,
        client: body.client,
    });

    await card.save();
    cli.cards.push(card._id);
    await Client.updateOne({ _id: cli._id }, { cards: cli.cards });

    return card;
};

module.exports = {
    getAll, getCards, getOne, count, save,
};
