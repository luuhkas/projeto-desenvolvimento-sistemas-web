import nodemailer from 'nodemailer';

// transporter do nodemailer usando o SMTP do Gmail (do .env)
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: Number(process.env.SMTP_PORT) === 465, // 465 = SSL
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
