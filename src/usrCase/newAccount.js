const { response } = require('express');
const accountRepository = require('../repositories/accountRepository');

const newAccount = async (req, res = response) => {
    try {
        console.log(req.body);

        const account = await accountRepository.save(req.body);

        if (!account) {
            return res.status(401).json({
                message: 'Problemas al crear al Cliente',
            });
        }

        return res.status(200).json({
            message: 'Cuenta Creada!',
            response: account,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newAccount };
