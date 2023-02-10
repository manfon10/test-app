"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDto = void 0;
const joi_1 = __importDefault(require("joi"));
const names = joi_1.default.string();
const surnames = joi_1.default.string();
const email = joi_1.default.string().email();
const level_id = joi_1.default.number();
const area_id = joi_1.default.number();
exports.createUserDto = joi_1.default.object({
    names: names.required(),
    surnames: surnames.required(),
    email: email.required(),
    level_id: level_id.required(),
    area_id: area_id.required(),
});
