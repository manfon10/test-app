const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const User = require("./user.model");

class Branch extends Model {}

Branch.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    postal_code: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email_contact: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email_administrator: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Branch.hasMany(User, { as: "branch", foreignKey: "branch_id" });
User.belongsTo(Branch, { as: "branch", foreignKey: "branch_id" });

module.exports = Branch;
