const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");
const AreaManager = require("./area-manager.model");

const Area = require("./area.model");
const Branch = require("./branch.model");
const Level = require("./level.model");
const Rol = require("./rol.model");
const UserPermission = require("./user-permission.model");

class User extends Model {}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    names: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    surnames: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Area.hasMany(User, { foreignKey: "area_id" });
User.belongsTo(Area, { as: "area", foreignKey: "area_id" });

Level.hasMany(User, { foreignKey: "level_id" });
User.belongsTo(Level, { as: "level", foreignKey: "level_id" });

Rol.hasMany(User, { as: "rol", foreignKey: "rol_id" });
User.belongsTo(Rol, { as: "rol", foreignKey: "rol_id" });

User.hasMany(UserPermission, { foreignKey: "user_id", onDelete: "cascade" });
UserPermission.belongsTo(User, { foreignKey: "user_id" });

Branch.hasMany(User, { as: "branch", foreignKey: "branch_id" });
User.belongsTo(Branch, { as: "branch", foreignKey: "branch_id" });

User.hasMany(AreaManager, {
  foreignKey: "user_id",
  onDelete: "cascade",
});
AreaManager.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = User;
