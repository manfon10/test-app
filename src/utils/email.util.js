require("dotenv").config();

const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");
const htmlToText = require("html-to-text");

class Email {
  constructor(to) {
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

  async send(template, subject, emailData) {
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

  async sendWelcome(data) {
    await this.send("welcome", "Registro Exitoso", { ...data });
  }
}

module.exports = Email;
