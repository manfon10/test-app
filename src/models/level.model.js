const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

class Level extends Model {}

Level.init(
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

module.exports = Level;
