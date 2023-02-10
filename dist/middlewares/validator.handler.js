"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const boom_1 = __importDefault(require("@hapi/boom"));
const validatorHandler = (schema, property) => {
    return (req, _, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom_1.default.badRequest(error));
        }
        next();
    };
};
module.exports = validatorHandler;
