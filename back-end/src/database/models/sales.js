'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'sales',
    underscored: true,
    timestamps: false,
  });
  Sales.associate = function(models) {
    Sales.belongsTo(models.User, {as: 'users', foreignKey: 'userId'});
    Sales.belongsTo(models.User, {as: 'users', foreignKey: 'sellerId'});
  };
  return Sales;
};