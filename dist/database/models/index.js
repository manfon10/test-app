"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Sequelize = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const database_1 = __importDefault(require("../../config/database"));
const sequelize = new sequelize_1.Sequelize(database_1.default.database, database_1.default.username, database_1.default.password, database_1.default);
exports.sequelize = sequelize;