const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const Product = require("./product.model");

class Project extends Model {}

Project.init(
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
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Project.hasMany(Product, { as: "product", foreignKey: "project_id" });
Product.belongsTo(Project, { as: "project", foreignKey: "project_id" });

module.exports = Project;
