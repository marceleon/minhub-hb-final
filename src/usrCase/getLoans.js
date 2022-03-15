const { response } = require('express');
const loanRepository = require('../repositories/loanRepository');

const getLoans = async (req, res = response) => {
    try {
        const loans = await loanRepository.getAll();

        if (!loans) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Loans',
            response: loans,
            total: loans.count,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const getOneLoan = async (req, res = response) => {
    try {
        const { id } = req.params;

        const loan = await loanRepository.getOne(id);

        if (!loan) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Loan',
            response: loan,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getLoans, getOneLoan };
