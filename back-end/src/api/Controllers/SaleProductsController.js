const addSalesAndProducts = require('../Services/SaleProductsService');

const newSaleAndProducts = async (req, res) => {
    const { id, products } = req.body;
    const data = await addSalesAndProducts(id, products);
    return res.status(201).json(data);
};

module.exports = newSaleAndProducts;