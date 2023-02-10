"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormErrorHandler = exports.boomErrorHandler = exports.errorHandler = void 0;
const sequelize_1 = require("sequelize");
const errorHandler = (err, __, res, _) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
};
exports.errorHandler = errorHandler;
const boomErrorHandler = (err, _, res, next) => {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    else {
        next(err);
    }
};
exports.boomErrorHandler = boomErrorHandler;
const ormErrorHandler = (err, _, res, next) => {
    if (err instanceof sequelize_1.ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors,
        });
    }
    next(err);
};
exports.ormErrorHandler = ormErrorHandler;
