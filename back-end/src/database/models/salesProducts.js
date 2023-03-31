'use strict';
module.exports = (sequelize, DataTypes) => {
const SalesProduct = sequelize.define('SalesProduct', {
  salesId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  productId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false}
}, {
  sequelize,
  modelName: 'salesProduct',
  underscored: true,
  timestamps: false,
  tableName: 'salesProducts',
});

SalesProduct.associate = function(models) {
  models.Sales.belongsToMany(models.Products, {as: 'products', through: SalesProduct, foreignKey: 'salesId', otherKey: 'productId'});
  models.Products.belongsToMany(models.Sales, {as: 'sales', through: SalesProduct, foreignKey: 'productId', otherKey: 'salesId'});
};
  return SalesProduct;
};