"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const error_handler_1 = require("./middlewares/error.handler");
const auth_handler_1 = require("./middlewares/auth.handler");
const app = (0, express_1.default)();
app.use(auth_handler_1.checkApiKey);
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)(process.env.NODE_ENV === "production" ? "tiny" : "dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(routes_1.router);
app.use(error_handler_1.ormErrorHandler);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.errorHandler);
exports.default = app;
