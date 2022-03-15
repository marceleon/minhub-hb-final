const { response } = require('express');
const transactionRepository = require('../repositories/transactionRepository');

const newTransaction = async (req, res = response) => {
    try {
        const trn = await transactionRepository.save(req.body);

        if (!trn) {
            return res.status(401).json({
                message: 'Problemas al crear la Transacción',
            });
        }

        return res.status(200).json({
            message: 'Transacción Registrada!',
            response: trn,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const transfer = async (req, res = response) => {
    try {
        const resultado = await transactionRepository.transfer(req.body);

        if (!resultado) {
            return res.status(401).json({
                message: 'Problemas con la Transferencia',
            });
        }

        return res.status(200).json({
            message: 'Transacción Registrada!',
            response: resultado,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newTransaction, transfer };
