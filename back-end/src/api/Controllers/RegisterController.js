const { newUser } = require('../Services/UserServices');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await newUser(name, email, password);
    if (user && user.error) {
        return res.status(401).json(user.error.message);
    }
    if (!user) {
        return res.status(409).json({ message: 'user already exists' });
    }
    return res.status(201).json(user);
};

module.exports = {
    register,
};