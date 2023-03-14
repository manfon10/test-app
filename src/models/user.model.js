const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const AreaManager = require("./area-manager.model");
const ProductManager = require("./product-manager.model");
const Product = require("./product.model");
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
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    is_first_login: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

User.hasMany(UserPermission, { foreignKey: "user_id", onDelete: "cascade" });
UserPermission.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(AreaManager, {
  foreignKey: "user_id",
  onDelete: "cascade",
});
AreaManager.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Product, { as: "product", foreignKey: "auditor_id" });
Product.belongsTo(User, { as: "auditor", foreignKey: "auditor_id" });

User.hasMany(ProductManager, { foreignKey: "user_id" });
ProductManager.belongsTo(User, {
  as: "manager_product",
  foreignKey: "user_id",
});

module.exports = User;
