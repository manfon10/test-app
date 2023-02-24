const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

class UserPermission extends Model {}

UserPermission.init(
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

module.exports = UserPermission;
