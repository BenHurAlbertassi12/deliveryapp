'use strict';
module.exports = (sequelize, DataTypes) => {
const SalesProduct = sequelize.define('SalesProduct', {
  saleId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  productId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false}
}, {
  sequelize,
  modelName: 'salesProduct',
  underscored: true,
  timestamps: false,
  tableName: 'sales_products',
});

SalesProduct.associate = function(models) {
  models.Sales.belongsToMany(models.Products, {as: 'products', through: SalesProduct, foreignKey: 'saleId', otherKey: 'productId'});
  models.Products.belongsToMany(models.Sales, {as: 'sales', through: SalesProduct, foreignKey: 'productId', otherKey: 'saleId'});
};
  return SalesProduct;
};