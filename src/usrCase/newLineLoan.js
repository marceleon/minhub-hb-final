const { response } = require('express');
const lineloanRepository = require('../repositories/lineloanRepositoriy');

const newLineLoan = async (req, res = response) => {
    try {
        console.log(req.body);

        const line = await lineloanRepository.save(req.body);

        if (!line) {
            return res.status(401).json({
                message: 'Problemas al crear al Cliente',
            });
        }

        return res.status(200).json({
            message: 'Nueve Línea de Préstamos!',
            response: line,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newLineLoan };
