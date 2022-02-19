const { response } = require('express');
const accountRepository = require('../repositories/accountRepository');

const getAccounts = async (req, res = response) => {
    try {
        const accounts = await accountRepository.getAll();
        const count = await accountRepository.count();

        if (!accounts) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Account',
            response: accounts,
            total: count,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const getOneAccount = async (req, res = response) => {
    try {
        const { id } = req.params;

        const account = await accountRepository.getOne(id);

        if (!account) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Accounts',
            response: account,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getAccounts, getOneAccount };
