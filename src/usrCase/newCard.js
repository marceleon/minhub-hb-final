const { response } = require('express');
const cardRepository = require('../repositories/cardRepository');

const newCard = async (req, res = response) => {
    try {
        console.log(req.body);

        const card = await cardRepository.save(req.body);
        console.log(card);

        if (!card) {
            return res.status(401).json({
                message: 'Problemas al crear la Tarjeta',
            });
        }

        return res.status(200).json({
            message: 'Tarjeta Creada!',
            response: card,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newCard };
