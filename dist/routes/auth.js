"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_dto_1 = require("../dtos/auth.dto");
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const router = (0, express_1.Router)();
exports.router = router;
router.post("/login", (0, validator_handler_1.default)(auth_dto_1.loginUserDto, "body"), auth_controller_1.loginUser);
