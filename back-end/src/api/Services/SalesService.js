const { Sales, User, Products } = require('../../database/models/index');

const addNewSale = async (sale) => {
    const newSale = await Sales.create({ ...sale });
    if (!newSale) {
        return null;
    }
    return newSale;
};

const findSellerSales = async (id) => {
    const data = await Sales.findAll({
        where: {
            sellerId: id,
        },
    });
    if (!data) {
        return null;
    }
    return data;
};

const findUserOrdes = async (id) => {
    const data = await Sales.findAll({
        where: { userId: id },
    });
    if (!data) {
        return null;
    }
    return data;
};

const findIdSale = async (id) => {
    const data = await Sales.findByPk(id, {
        include: [
                { model: User, as: 'seller', attributes: ['name'] },
                { model: Products, as: 'products' },
                ] });
        if (!data) {
            return null;
        }
        return data;
};
    
const updateStatus = async (id, status) => {
    const data = await Sales.update({ status }, { where: { id } });
    if (!data) {
        return null;
    }
    return data;
};

module.exports = {
    addNewSale,
    findIdSale,
    findUserOrdes,
    findSellerSales,
    updateStatus,
};