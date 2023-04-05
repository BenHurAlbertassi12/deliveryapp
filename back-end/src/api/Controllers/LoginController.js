const { verifyUser } = require('../Services/UserServices');

const login = async (req, res) => {
    const { email, password } = req.body;
    const data = await verifyUser(email, password);
    
    if (data && data.error) return res.status(401).json(data.error.message);
    if (!data) {
        return res.status(404).json({ message:
    'User Not Found!' }); 
}
    return res.status(200).json(data);
};  

module.exports = {
    login,
};