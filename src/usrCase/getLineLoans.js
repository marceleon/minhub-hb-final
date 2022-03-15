const { response } = require('express');
const lineloanRepository = require('../repositories/lineloanRepositoriy');

const getLineLoans = async (req, res = response) => {
    try {
        const lines = await lineloanRepository.getAll();

        if (!lines) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Lines',
            response: lines,
            total: lines.count,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const getOneLineLoan = async (req, res = response) => {
    try {
        const { id } = req.params;

        const line = await lineloanRepository.getOne(id);

        if (!line) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        return res.status(200).json({
            message: 'Line',
            response: line,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { getLineLoans, getOneLineLoan };
