const nodemailer = require("nodemailer");

// Note: Use environment variables (firebase functions:config:set) for these in production
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "YOUR_EMAIL@gmail.com",
    pass: process.env.EMAIL_PASS || "YOUR_APP_PASSWORD", 
  },
});

const sendQRMail = async (to, name, qrImage) => {
  const mailOptions = {
    from: `"Hackathonbuddy Team" <${process.env.EMAIL_USER || "YOUR_EMAIL@gmail.com"}>`,
    to,
    subject: "🎟️ Your Hackathon Entry QR Code",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1a202c;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #6C63FF; margin-bottom: 8px;">Registration Successful!</h1>
          <p style="font-size: 16px; color: #4a5568;">Get ready for an amazing hackathon experience.</p>
        </div>
        
        <div style="padding: 24px; background-color: #f7fafc; border-radius: 8px; text-align: center;">
          <h2 style="margin-top: 0;">Hello ${name},</h2>
          <p>Your entry pass for the hackathon is attached below as a QR code.</p>
          <div style="margin: 32px 0;">
            <img src="${qrImage}" alt="QR Code" style="width: 200px; height: 200px; border: 4px solid #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" />
          </div>
          <p style="font-weight: bold; color: #e53e3e;">⚠️ Do not share this QR code with anyone.</p>
        </div>
        
        <div style="margin-top: 24px; font-size: 14px; color: #718096; line-height: 1.6;">
          <p><strong>How to use:</strong> Present this QR code at the registration desk on the day of the event for a seamless check-in.</p>
          <p>If you have any questions, feel free to reply to this email.</p>
        </div>
        
        <div style="margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 12px; color: #a0aec0;">
          <p>© 2026 Hackathonbuddy. Built with ❤️ for hackers.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    // Don't throw here, we don't want to fail the registration if email fails
  }
};

module.exports = { sendQRMail };
