import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // use TLS for 465, others use STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetEmail = async (email: string, token: string, username: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Film Industry MP" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Reset Your Admin Password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px;">
        <h2 style="color: #8B6F47; text-align: center;">Admin Portal Password Reset</h2>
        <p>You requested a password reset for the Film Industry MP Admin Portal.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #eee;">
            <p style="margin: 0; color: #666; font-size: 14px;">Your Username:</p>
            <p style="margin: 5px 0 0 0; font-weight: bold; font-size: 18px; color: #333;">${username}</p>
        </div>
        <p>Please click the button below to set a new password. This link is valid for 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #8B6F47; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If you did not request this, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666; text-align: center;">Madhya Pradesh Film Tourism Board</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

export const sendUsernameResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

  const mailOptions = {
    from: `"Film Industry MP" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Admin Portal Username Recovery',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px;">
        <h2 style="color: #8B6F47; text-align: center;">Username Recovery</h2>
        <p>You requested a recovery/update for your username on the Film Industry MP Admin Portal.</p>
        <p>Please click the button below to view or change your current username. This link is valid for 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #8B6F47; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Recover Username</a>
        </div>
        <p>If you did not request this, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666; text-align: center;">Madhya Pradesh Film Tourism Board</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
