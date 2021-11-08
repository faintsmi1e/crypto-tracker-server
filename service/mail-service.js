import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()


class MailServise {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendActivationMail(to, link) {
    console.log(process.env.API_URL)
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html: `
          <div>
            <h1>Перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
    });
  }
}

export default new MailServise();
