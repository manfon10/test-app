const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

class ProductManager extends Model {}

ProductManager.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

module.exports = ProductManager;
