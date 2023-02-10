"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const area_model_1 = __importDefault(require("./area.model"));
const level_model_1 = __importDefault(require("./level.model"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    names: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    surnames: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
    sequelize: _1.sequelize,
});
level_model_1.default.hasMany(User, { foreignKey: "level_id" });
User.belongsTo(level_model_1.default, { as: "level", foreignKey: "level_id" });
area_model_1.default.hasMany(User, { foreignKey: "area_id" });
User.belongsTo(area_model_1.default, { as: "area", foreignKey: "area_id" });
exports.default = User;
