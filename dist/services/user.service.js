"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const area_model_1 = __importDefault(require("../database/models/area.model"));
const level_model_1 = __importDefault(require("../database/models/level.model"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
const email_util_1 = require("../utils/email.util");
const auth_service_1 = require("./auth.service");
exports.userService = {
    create: async (data) => {
        const password = Math.random().toString(36).substring(0, 10);
        const passwordHash = await auth_service_1.authService.hashPassword(password);
        const user = await user_model_1.default.create(Object.assign(Object.assign({}, data), { password: passwordHash }));
        if (user) {
            await new email_util_1.Email(data.email).sendWelcome({
                names: data.names,
                surnames: data.surnames,
                password,
                email: data.email,
            });
        }
        delete user.dataValues.password;
        return user;
    },
    findByEmail: async (email) => {
        const user = await user_model_1.default.findOne({
            include: [
                {
                    model: level_model_1.default,
                    as: "level",
                    attributes: ["id", "name"],
                },
                {
                    model: area_model_1.default,
                    as: "area",
                    attributes: ["id", "name"],
                },
            ],
            attributes: ["id", "names", "surnames", "email"],
            where: { email },
        });
        if (!user) {
            throw boom_1.default.notFound("Email does not exist");
        }
        return user;
    },
};
