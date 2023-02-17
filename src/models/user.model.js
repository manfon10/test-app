const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const Area = require("./area.model");
const Level = require("./level.model");
const Permission = require("./permission.model");
const Rol = require("./rol.model");

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

Permission.belongsToMany(User, {
  as: "user_permission",
  through: "user_permissions",
});
User.belongsToMany(Permission, {
  as: "user_permission",
  through: "user_permissions",
});

module.exports = User;