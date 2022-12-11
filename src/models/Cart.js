const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/database.config');

class Cart extends Model {}
Cart.init(
  {
    idCart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalCharge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'carrito',
    timestamps: false,
    modelName: 'Cart',
    underscored: true,
  }
);

module.exports = Cart;
