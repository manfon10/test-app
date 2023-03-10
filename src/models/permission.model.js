const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const RolPermission = require("./rol-permission.model");
const UserPermission = require("./user-permission.model");

class Permission extends Model {}

Permission.init(
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
    slug: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Permission.hasMany(RolPermission, {
  foreignKey: "permission_id",
  onDelete: "cascade",
});
RolPermission.belongsTo(Permission, { foreignKey: "permission_id" });

Permission.hasMany(UserPermission, {
  foreignKey: "permission_id",
  onDelete: "cascade",
});
UserPermission.belongsTo(Permission, { foreignKey: "permission_id" });

module.exports = Permission;
