"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const cookie_handler_1 = require("../middlewares/cookie.handler");
const auth_service_1 = require("../services/auth.service");
const loginUser = async (req, res, next) => {
    try {
        const body = req.body;
        const responseLogin = await auth_service_1.authService.login(body);
        return (0, cookie_handler_1.cookieResponse)(res, Object.assign({}, responseLogin));
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
