import nodemailer from "nodemailer";
import "dotenv/config";

export const generateCodeOfConfirmation = () => {
    const hash = Math.floor(Date.now() * Math.random()).toString(36);
    return hash
}

export const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

export const sendMail = async (emailMessage) => {
    await transport.sendMail(emailMessage);
}
