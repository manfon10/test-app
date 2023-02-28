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

Company.hasMany(Branch, {
  as: "company",
  foreignKey: "company_id",
  onDelete: "cascade",
});
Branch.belongsTo(Company, { as: "company", foreignKey: "company_id" });

module.exports = Company;
