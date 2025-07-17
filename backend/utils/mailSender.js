const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Verify connection configuration
        await transporter.verify();
        console.log("SMTP connection is ready!");

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER, // 
            to: email,
            subject: title,
            html: body,
        });

        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error while sending mail (mailSender):', error.message);
        throw error; // 
    }
};

module.exports = mailSender;
