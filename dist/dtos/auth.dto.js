"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserDto = void 0;
const joi_1 = __importDefault(require("joi"));
const email = joi_1.default.string().email();
const password = joi_1.default.string();
exports.loginUserDto = joi_1.default.object({
    email: email.required(),
    password: password.required(),
});
