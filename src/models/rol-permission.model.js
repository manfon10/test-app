const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

class RolPermission extends Model {}

RolPermission.init(
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

module.exports = RolPermission;
