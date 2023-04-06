const Joi = require('joi');
const md5 = require('md5');
const { User } = require('../../database/models');
const { createToken } = require('../utils/Token');

// Schema para validação de novos usuarios:
const newUserSchemas = Joi.object({
    name: Joi.string().min(12).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
    password: Joi.string().min(6).required(),
});
// Schema para validação de login:
const loginSchemas = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
    password: Joi.string().min(6).required(),
});

// Função para validar o login:
const verifyUser = async (email, password) => {
    const validate = loginSchemas.validate({ email, password });

    if (validate.error) {
        return validate;
    }

    const mashPass = md5(password);
    const user = await User.findOne(
        { attributes: { exclude: ['password'] },
        where: { email, password: mashPass } },
    );
    
    if (!user) {
        return null;
    }

    const token = createToken(user.dataValues);
    return { ...user.dataValues, token };
};

// Função para criação de usuario:
const newUser = async (name, email, password, role) => {
    const validate = newUserSchemas.validate({ name, email, password });

    if (validate.error) {
        return validate;
    }
    const findUser = await User.findOne({ where: { email } });
    if (findUser) {
        return null;
    }

    const mashPass = md5(password);
    const data = await User.create({ name, email, password: mashPass, role });
    const { password: _, ...dataValues } = data.dataValues;
    const token = createToken(dataValues);

    return { ...dataValues, token }; 
};

module.exports = {
    verifyUser,
    newUser,
};