"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieResponse = void 0;
require("dotenv/config");
const boom_1 = __importDefault(require("@hapi/boom"));
const cookieResponse = (res, data) => {
    if (data.user) {
        return res
            .status(201)
            .cookie("token", data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            expires: new Date(new Date().setDate(new Date().getDate() + 1)),
        })
            .json(Object.assign({}, data));
    }
    throw boom_1.default.unauthorized();
};
exports.cookieResponse = cookieResponse;
