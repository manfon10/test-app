const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const AreaManager = require("./area-manager.model");
const User = require("./user.model");

class Area extends Model {}

Area.init(
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
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Area.hasMany(User, { foreignKey: "area_id" });
User.belongsTo(Area, { as: "area", foreignKey: "area_id" });

Area.hasMany(AreaManager, {
  as: "area_manager",
  foreignKey: "area_id",
  onDelete: "cascade",
});
AreaManager.belongsTo(Area, {
  as: "manager_area",
  foreignKey: "area_id",
});

module.exports = Area;
