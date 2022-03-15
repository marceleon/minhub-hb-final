const { response } = require('express');
const accountRepository = require('../repositories/accountRepository');

const getTransactions = async (req, res = response) => {
    try {
        const { id } = req.params;

        const trn = await accountRepository.getOne(id);

        if (!trn) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Transactions',
            response: trn,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getTransactions };
