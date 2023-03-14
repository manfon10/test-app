const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const RolMenuSlug = require("./rol-menu-slug.model");
const RolPermission = require("./rol-permission.model");
const User = require("./user.model");

class Rol extends Model {}

Rol.init(
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

Rol.hasMany(RolPermission, { foreignKey: "rol_id", onDelete: "cascade" });
RolPermission.belongsTo(Rol, { foreignKey: "rol_id" });

Rol.hasMany(RolMenuSlug, { foreignKey: "rol_id", onDelete: "cascade" });
RolMenuSlug.belongsTo(Rol, { foreignKey: "rol_id" });

Rol.hasMany(User, { as: "rol", foreignKey: "rol_id" });
User.belongsTo(Rol, { as: "rol", foreignKey: "rol_id" });

module.exports = Rol;
