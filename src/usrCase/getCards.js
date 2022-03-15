const { response } = require('express');
const CardRepository = require('../repositories/cardRepository');

const getAllCards = async (req, res = response) => {
    try {
        const cards = await CardRepository.getAll();
        const count = await CardRepository.count();

        if (!cards) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Cards',
            response: cards,
            total: count,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const getCards = async (req, res = response) => {
    try {
        const { id } = req.params;
        const cards = await CardRepository.getCards({ client: id });

        console.log(id);
        console.log(cards);

        if (!cards) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Cards',
            response: cards,
            total: cards.count,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const getOneCard = async (req, res = response) => {
    try {
        const { id } = req.params;
        const card = await CardRepository.getOne(id);

        if (!card) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Card',
            response: card,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getAllCards, getCards, getOneCard };
