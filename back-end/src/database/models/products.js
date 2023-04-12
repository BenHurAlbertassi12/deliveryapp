'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false
    },
    url_image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'products',
    underscored: true,
    timestamps: false,
  });
  Products.associate = function(models) {
    Products.hasMany(models.SalesProduct, { foreignKey: 'productId', as: 'sales_products'});
  };
  return Products;
};