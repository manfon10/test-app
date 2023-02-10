"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Area extends sequelize_1.Model {
}
Area.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
    sequelize: _1.sequelize,
});
exports.default = Area;