const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

class Area extends Model {}

Area.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

module.exports = Area;
