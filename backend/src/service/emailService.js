const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactConfirmation = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Sakura Japan Consultancy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E53E3E;">🌸 Sakura Japan Consultancy</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us! We have received your inquiry and our team will get back to you within 24-48 hours.</p>
          <p>In the meantime, feel free to explore our services and success stories on our website.</p>
          <p>Best regards,<br>Sakura Japan Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendContactConfirmation,
};
