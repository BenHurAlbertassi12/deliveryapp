'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
    underscored: true,
    timestamps: false,
  });
  User.associate = function(models) {
    User.hasMany(models.Sales, {as: 'sales', foreignKey: 'userId'});
    User.hasMany(models.Sales, {as: 'sales_sold', foreignKey: 'sellerId'});
  };
  return User;
};