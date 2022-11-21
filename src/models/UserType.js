const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/database.config');

class UserType extends Model {}
UserType.init(
  {
    idUserType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      default: 'Alumno',
    },
  },
  {
    sequelize,
    tableName: 'tipo_usuario',
    timestamps: false,
    modelName: 'UserType',
    underscored: true,
  }
);

module.exports = UserType;
