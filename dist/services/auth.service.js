"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const boom_1 = __importDefault(require("@hapi/boom"));
const user_service_1 = require("./user.service");
exports.authService = {
    login: async (data) => {
        const user = await user_service_1.userService.findByEmail(data.email);
        if (!user ||
            (user.password &&
                !(await exports.authService.comparePassword(data.password, user.password)))) {
            throw boom_1.default.unauthorized("Invalid credentials");
        }
        delete user.dataValues.password;
        return Object.assign({ user }, exports.authService.generateAuthData(user));
    },
    comparePassword: (password, passwordHash) => {
        return bcryptjs_1.default.compare(password, passwordHash);
    },
    decodedToken: (token) => {
        return jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
    },
    generateToken: (data) => {
        return jsonwebtoken_1.default.sign(data, `${process.env.JWT_SECRET}`, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    },
    generateAuthData: (userData) => {
        const user = { id: userData.id };
        return {
            token: exports.authService.generateToken(user),
        };
    },
    hashPassword: async (password) => {
        return await bcryptjs_1.default.hash(password, 10);
    },
};
