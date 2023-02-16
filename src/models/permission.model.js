const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");
const MenuSlug = require("./menu-slug.model");

const Rol = require("./rol.model");

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
  },
  {
    timestamps: true,
    sequelize,
  }
);

Rol.hasMany(Permission, { as: "permission", foreignKey: "rol_id" });
Permission.belongsTo(Rol, { as: "permission", foreignKey: "rol_id" });

MenuSlug.hasMany(Permission, { as: "menu_slug", foreignKey: "menu_slug_id" });
Permission.belongsTo(MenuSlug, {
  as: "menu_slug",
  foreignKey: "menu_slug_id",
});

module.exports = Permission;
