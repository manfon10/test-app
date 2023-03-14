const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const User = require("./user.model");

class Level extends Model {}

Level.init(
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

Level.hasMany(User, { foreignKey: "level_id" });
User.belongsTo(Level, { as: "level", foreignKey: "level_id" });

module.exports = Level;
