const nodemailer = require('nodemailer');

// NOTE: Hardcoded email configuration for development.
// Replace 'YOUR_APP_PASSWORD_HERE' with your actual Gmail App Password locally.
// Do NOT commit real secrets to version control in a real project.
const EMAIL_HOST = 'smtp.gmail.com';
const EMAIL_PORT = 587;
const EMAIL_USER = 'tufu1102@gmail.com';
const EMAIL_PASS = 'exli bupp hwzz gldx';
const EMAIL_FROM = 'SkyReserve <tufu1102@gmail.com>';

// Create a reusable transporter using the hardcoded SMTP settings.
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

/**
 * Send a simple text email.
 * @param {string} to recipient email
 * @param {string} subject subject line
 * @param {string} text plain text body
 */
const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    text
  });
};

module.exports = { sendEmail };


