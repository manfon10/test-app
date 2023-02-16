const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");
const Branch = require("./branch.model");

class Company extends Model {}

Company.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    business_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rfc: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Branch.hasMany(Company, { as: "branch", foreignKey: "branch_id" });
Company.belongsTo(Branch, { as: "branch", foreignKey: "branch_id" });

module.exports = Company;
