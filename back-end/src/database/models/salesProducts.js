'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('salesProducts', {
    salesId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    productsId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    // modelName: 'salesProducts',
    underscored: true,
    timestamps: false,
    tableName: 'salesProducts',
  });
  SalesProducts.associate = function(models) {
    models.Sales.belongsToMany(models.Products, {as: 'products', through: SalesProducts, foreignKey: 'salesId', otherKey: 'productsId'});
    models.Products.belongsToMany(models.Sales, {as: 'sales', through: SalesProducts, foreignKey: 'productsId', otherKey: 'salesId'});
  };
  return SalesProducts;
};