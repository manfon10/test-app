const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const ProductManager = require("./product-manager.model");

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

Product.hasMany(ProductManager, {
  as: "product_manager",
  foreignKey: "product_id",
  onDelete: "cascade",
});
ProductManager.belongsTo(Product, {
  foreignKey: "product_id",
});

module.exports = Product;
