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

const getOneClient = async (req, res = response) => {
    try {
        const { id } = req.params;

        console.log(req.params);
        console.log(id);

        const client = await clientRepository.getOne(id);

        if (!client) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Client',
            response: client,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const getSomeClients = async (req, res = response) => {
    try {
        const IDs = req.query.ID;
        const criterio = { _id: IDs };
        const clients = await clientRepository.getSome(criterio);

        /*
        FOR AWAIT: permite iterar esperando promoesas
                   no está recomendado en normas de programacion
        const resultado = [];

        for await (id of IDs) {

            const client = await clientRepository.getOne(id);

            if (!client) { client = { id, msg: 'Cliente NO Encontrado' }; }

            resultado.push(client);
            console.log(resultado);
        }
        */

        console.log('Paso por aca');

        return res.status(200).json({
            message: 'Varios Clientes',
            cant: clients.length,
            response: clients,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getClients, getOneClient, getSomeClients };
