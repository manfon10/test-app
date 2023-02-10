"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
require("dotenv/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const path_1 = __importDefault(require("path"));
const htmlToText = __importStar(require("html-to-text"));
class Email {
    constructor(to) {
        this.to = to;
    }
    newTransport() {
        if (process.env.NODE_ENV === "production") {
            return nodemailer_1.default.createTransport({
                host: process.env.EMAIL_HOST,
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
        }
        return nodemailer_1.default.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAILTRAP_USER,
                pass: process.env.EMAILTRAP_PASS,
            },
        });
    }
    async send(template, subject, emailData) {
        const html = pug_1.default.renderFile(path_1.default.join(`${__dirname}/../views/email/${template}.pug`), emailData);
        await this.newTransport().sendMail({
            from: process.env.EMAIL_USER,
            to: this.to,
            subject,
            html,
            text: htmlToText.convert(html),
        });
    }
    async sendWelcome(data) {
        await this.send("welcome", "Registro Exitoso", Object.assign({}, data));
    }
}
exports.Email = Email;
