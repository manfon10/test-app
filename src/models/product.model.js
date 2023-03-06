const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const Project = require("./project.model");
const User = require("./user.model");

class Product extends Model {}

Product.init(
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
    part_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    cycle_time: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    engineering_level: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

User.hasMany(Product, { as: "product", foreignKey: "auditor_id" });
Product.belongsTo(User, { as: "auditor", foreignKey: "auditor_id" });

Project.hasMany(Product, { as: "product", foreignKey: "project_id" });
Product.belongsTo(Project, { as: "project", foreignKey: "project_id" });

module.exports = Product;
