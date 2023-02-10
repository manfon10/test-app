"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkApiKey = void 0;
require("dotenv/config");
const boom_1 = __importDefault(require("@hapi/boom"));
const checkApiKey = (req, _, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey === process.env.APP_API_KEY) {
        next();
    }
    else {
        next(boom_1.default.unauthorized());
    }
};
exports.checkApiKey = checkApiKey;
