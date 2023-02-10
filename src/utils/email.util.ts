import "dotenv/config";

import nodemailer from "nodemailer";
import pug from "pug";
import path from "path";
import * as htmlToText from "html-to-text";

import { IUserInput } from "../types/models/user.type";

export class Email {
  to: string;

  constructor(to: string) {
    this.to = to;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAILTRAP_USER,
        pass: process.env.EMAILTRAP_PASS,
      },
    });
  }

  async send(template: string, subject: string, emailData: any) {
    const html = pug.renderFile(
      path.join(`${__dirname}/../views/email/${template}.pug`),
      emailData
    );

    await this.newTransport().sendMail({
      from: process.env.EMAIL_USER,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    });
  }

  async sendWelcome(data: IUserInput) {
    await this.send("welcome", "Registro Exitoso", { ...data });
  }
}
