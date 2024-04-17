// emailSender.js

const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'barabaraniusalama@gmail.com',
        pass: 'yshp otlu gpuw jtyz'
    }
});

// Function to send email
async function sendEmail(email, subject, text) {
    try {
        await transporter.sendMail({
            from: 'barabaraniusalama@gmail.com',
            to: email,
            subject: "Traffic Fine ",
            text: text
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;
