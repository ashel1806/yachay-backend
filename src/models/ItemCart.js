const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/database.config');

class ItemCart extends Model {}
ItemCart.init(
  {
    idItemCart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idCart: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCourse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'item_carrito',
    timestamps: false,
    modelName: 'ItemCart',
    underscored: true,
  }
);

module.exports = ItemCart;
