"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const models_1 = require("./database/models");
const PORT = process.env.APP_PORT || 4000;
app_1.default.listen(PORT, () => {
    console.log(`Express app running on port: ${PORT}`);
    models_1.sequelize
        .sync({
        force: false,
        alter: process.env.NODE_ENV === "development",
        logging: false,
    })
        .then(() => {
        console.log(`Database Conected!`);
    })
        .catch((error) => {
        console.log(error);
    });
});
