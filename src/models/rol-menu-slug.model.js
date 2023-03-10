const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

class RolMenuSlug extends Model {}

RolMenuSlug.init(
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

module.exports = RolMenuSlug;
