const { response } = require('express');
const clientRepository = require('../repositories/clientRepository');

const getClients = async (req, res = response) => {
    try {
        const clients = await clientRepository.getAll();
        const count = await clientRepository.count();

        if (!clients) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Clients',
            response: clients,
            total: count,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getClients };
