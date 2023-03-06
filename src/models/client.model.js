const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");

const Project = require("./project.model");

class Client extends Model {}

Client.init(
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

Client.hasMany(Project, { as: "project", foreignKey: "client_id" });
Project.belongsTo(Client, {
  as: "client",
  foreignKey: "client_id",
  onDelete: "cascade",
});

module.exports = Client;
