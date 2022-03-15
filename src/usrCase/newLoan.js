const { response } = require('express');
const loanRepository = require('../repositories/loanRepository');

const newLoan = async (req, res = response) => {
    try {
        const loan = await loanRepository.save(req.body);

        if (!loan) {
            return res.status(401).json({
                message: 'Problemas al crear al Cliente',
            });
        }

        return res.status(200).json({
            message: 'Nueve Préstamo!',
            response: loan,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const newLoanAndDeposit = async (req, res = response) => {
    try {
        console.log(req.body);

        const dep = await loanRepository.saveAndDeposit(req.body);

        if (!dep) {
            return res.status(401).json({
                message: 'Problemas al otorgar el Crédito',
            });
        }

        return res.status(200).json({
            message: 'Nueve Préstamo!',
            response: dep,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newLoan, newLoanAndDeposit };
