'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false
    },
    price: {
      type: DECIMAL(4, 2),
      allowNull: false
    },
    url_image: {
      type: STRING(200),
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'products',
    underscored: true,
    timestamps: false,
  });
  Products.associate = function(models) {
    Products.hasMany(models.SalesProducts, {as: 'salesProducts'})
  };
  return Products;
};