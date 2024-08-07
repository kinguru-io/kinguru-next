import { createTransport } from "nodemailer";

export const transporter = createTransport(
  {
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || "") || 0,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  { from: process.env.EMAIL_FROM },
);
