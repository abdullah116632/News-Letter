export const createOtpMailHtml = (data) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px; margin: 0;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 0 12px rgba(0,0,0,0.08);">
            <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
            <p style="font-size: 16px; color: #555;">Hello <strong>${data.user.fullName}</strong>,</p>
            <p style="font-size: 16px; color: #555;">Here is your one-time password (OTP) to reset your account password:</p>
            <div style="text-align: center; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; color: #007bff;">${data.otp}</span>
            </div>
            <p style="font-size: 14px; color: #888;">This OTP is valid for 15 minutes. Please do not share it with anyone.</p>
            <p style="font-size: 14px; color: #888;">If you didn't request this, please ignore this message.</p>
            <p style="font-size: 14px; color: #aaa; text-align: center;">— Newsletter Support Team</p>
          </div>
        </body>
      </html>`
}

export const createSignupMailHtml = (data) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 40px;">
          <div style="max-width: 600px; background-color: #fff; margin: auto; padding: 30px; border-radius: 8px; box-shadow: 0 0 12px rgba(0,0,0,0.1);">
            <h2 style="color: #2d2d2d;">Hey ${data.user.fullName},</h2>
            <p style="font-size: 16px; color: #555;">Thanks for signing up for our newsletter! We're thrilled to have you here. 🎉</p>
            <p style="font-size: 16px; color: #555;">Get ready to receive insightful content, expert tips, and exclusive updates directly to your inbox.</p>
            <hr style="margin: 30px 0;" />
            <p style="font-size: 14px; color: #999;">Cheers,<br>The Newsletter Team</p>
          </div>
        </body>
      </html>`
}

export const createSubscriptionMailHtml = (data) => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f1f1f1; margin: 0; padding: 40px;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <h2 style="color: #333;">Hi ${data.user.fullName},</h2>
            <p style="font-size: 16px; color: #444;">Thank you for subscribing to our premium newsletter plan. 🙌</p>
            <p style="font-size: 16px; color: #444;">We’ll deliver valuable content, career opportunities, and resources tailored to your interests.</p>
            <div style="margin: 30px 0;">
              <strong style="color: #007bff;">Subscription Start Date:</strong> ${data.user.startDate}<br/>
              <strong style="color: #007bff;">Subscription End Date:</strong> ${data.user.endDate}<br/>
            </div>
            <p style="font-size: 14px; color: #999;">Need help? Just reply to this email. We’re here for you.</p>
            <p style="font-size: 14px; color: #999;">— Newsletter Team</p>
          </div>
        </body>
      </html>`
}