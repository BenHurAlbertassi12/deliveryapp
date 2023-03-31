const Joi = require('joi');
const md5 = require('md5');
const { users } = require('../../database/models/users');

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
        return validate.error;
    }
    const mashPass = md5(password);
    console.log(mashPass);
    const findUser = await users.findOne({ where: { email, password: mashPass } });
    if (!findUser) {
        return null;
    }
    return true;
};

// Função para criação de usuario:
const newUser = async (name, email, password) => {
    const validate = newUserSchemas.validate({ name, email, password });
    if (validate.error) {
        return validate.error;
    }
    const findUser = await users.findOne({ where: { email } });
    if (findUser) {
        return null;
    }
    const mashPass = md5(password);
    await users.create({ name, email, password: mashPass, role: 'user' });
    return true;
};

module.exports = {
    verifyUser,
    newUser,
};