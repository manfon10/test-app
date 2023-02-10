"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const createUser = async (req, res, next) => {
    try {
        const body = req.body;
        const newUser = await user_service_1.userService.create(body);
        res.status(201).json({ newUser });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
