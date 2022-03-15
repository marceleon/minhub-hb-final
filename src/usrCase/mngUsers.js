const { response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repositories/userRepository');
const ClientRepository = require('../repositories/clientRepository');

const newUser = async (req, res = response) => {
    try {
        // Valido que existe el cliente
        const { email, password } = req.body;
        const client = await ClientRepository.getSome({ email });

        if (client.length === 0) {
            return res.status(401).json({
                message: 'email erróneo',
            });
        }

        // Encriptado de clave
        // Ejemplo:
        // clave2022
        // $2b$10$jHQezXIuOTn8RuCTHrI/Iul7/4CU6GqYZhov2Y1wclPq5nzZTAcP.

        const salt = await bcrypt.genSalt(10);
        const pwd = await bcrypt.hash(password, salt);

        req.body.password = pwd;

        const usr = await UserRepository.save(req.body);
        return res.status(200).json(usr);
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const usr = await UserRepository.getOne({ email });

        if (!usr) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        const client = await ClientRepository.getSome({ email });
        if (client.length === 0) {
            return res.status(401).json({
                message: 'Not found -- NO SE ENCONTRO',
            });
        }

        const pdwValida = await bcrypt.compare(password, usr.password);

        if (pdwValida) {
            const token = jwt.sign({
                id: usr._id,
                email: usr.email,
            }, process.env.TOKEN_KEY);
            res.header('auth-token', token);
            res.status(200).json({
                status: 'OK',
                id: client[0]._id,
                token,
            });
        } else { res.status(401).json({ status: 'ERROR' }); }
        return res;
    } catch (error) {
        return res.status(500).json({
            message: 'Error Interno del Servidor',
            err: error,
        });
    }
};

module.exports = { newUser, login };
