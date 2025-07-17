import nodemailer from "nodemailer";
import { EmailOptions } from "../types/global.types";

const transport = nodemailer.createTransport({
  // @ts-express-error // host type error
  host: process.env.SMTP_HOST ?? "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT ?? "465"), // Ensure port is a number

  secure: parseInt(process.env.SMTP_PORT ?? "") === 465 ? true : false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (options: EmailOptions) => {
  try {
    await transport.sendMail({
      from: `shop-kart<${process.env.SMTP_USER}>`,
      subject: options.subject,
      to: options.to,
      html: options.html,
    });
  } catch (error) {
    console.log(error);
  }
};
