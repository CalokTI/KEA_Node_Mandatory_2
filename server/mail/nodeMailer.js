import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

export async function mailCreate(mail) {
    let info = await transporter.sendMail({
        from: '"John Wayne 🔫" <johnwayne@wildwest.us>', // sender address
        to: mail, // list of receivers
        subject: "Wild West 🐎", // Subject line
        text: "Hello there. Welcome to the wild wild west. -John Wayne", // plain text body
        html: null, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}