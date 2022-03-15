const User = require('../models/user');

const getOne = async (mail) => { const r = await User.findOne(mail); return r; };

const save = async (body) => {
    const usr = new User({
        email: body.email,
        password: body.password,
        fistName: body.firstName,
        lastName: body.lastName,
    });
    await usr.save();

    return usr;
};

module.exports = { save, getOne };
