const { 
    addNewSale,
    findIdSale,
    findUserOrdes,
    findSellerSales,
    updateStatus, 
} = require('../Services/SalesService');

const addSale = async (req, res) => {
    const sale = req.body;
    const newSale = await addNewSale(sale);
    if (!newSale) {
        return res.status(500).json({ message: 'Internal Error' });
    }
    return res.status(201).json(newSale);
};
const getIdSale = async (req, res) => {
    const { id } = req.params;
    const sale = await findIdSale(id);
    if (!sale) {
        return res.status(404).json({ message: 'Sale not Found' });
    }
    return res.status(200).json(sale);
};
const getUserOrders = async (req, res) => {
    const { id } = req.body;
    const orders = await findUserOrdes(id);
    if (!orders) {
        return res.status(404).json({ message: 'Orders not found' });
    }
    return res.status(200).json(orders);
};
const getSellerSales = async (req, res) => {
    const { id } = req.body;
    const sales = await findSellerSales(id);
    if (!sales) {
        return res.status(404).json({ message: 'Sales not found' });
    }
    return res.status(200).json(sales);
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = await updateStatus(id, status);
    if (!order) {
        return res.status(404).json({ message: 'Orders not found' });
    }
    return res.status(200).json(order);
};

module.exports = {
addSale,
getIdSale,
getUserOrders,
getSellerSales,
updateOrder,
};