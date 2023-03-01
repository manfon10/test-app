const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

class AreaManager extends Model {}

AreaManager.init(
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

module.exports = AreaManager;
