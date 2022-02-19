const { response } = require('express');
const clientRepository = require('../repositories/clientRepository');

const newClient = async (req, res = response) => {
    try {
        console.log(req.body);

        const client = await clientRepository.save(req.body);

        if (!client) {
            return res.status(401).json({
                message: 'Problemas al crear al Cliente',
            });
        }

        return res.status(200).json({
            message: 'Cliente Creado!',
            response: client,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newClient };
