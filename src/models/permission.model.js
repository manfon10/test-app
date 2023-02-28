const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const MenuSlug = require("./menu-slug.model");
const Rol = require("./rol.model");
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

Rol.hasMany(Permission, { foreignKey: "rol_id" });
Permission.belongsTo(Rol, { foreignKey: "rol_id" });

MenuSlug.hasMany(Permission, { as: "menu_slug", foreignKey: "menu_slug_id" });
Permission.belongsTo(MenuSlug, {
  as: "menu_slug",
  foreignKey: "menu_slug_id",
});

Permission.hasMany(UserPermission, {
  foreignKey: "permission_id",
  onDelete: "cascade",
});
UserPermission.belongsTo(Permission, { foreignKey: "permission_id" });

module.exports = Permission;
