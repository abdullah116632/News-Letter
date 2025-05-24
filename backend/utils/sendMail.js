import nodemailer from "nodemailer";
import { createOtpMailHtml, createSignupMailHtml, createSubscriptionMailHtml } from "./mailHtml.js";

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

let subject;
let html;

const sendEmail = async (type, data) => {
  switch (type) {
    case "signup":
      subject = "Welcome to Our Opt.national!";
      html = createSignupMailHtml(data);
      break;

    case "subscription":
      subject = "Subscription Confirmed!";
      html = createSubscriptionMailHtml(data);
      break;

    case "otp":
      subject = "Your Password Reset OTP";
      html = createOtpMailHtml(data);
      break;

    default:
      throw new Error("Unknown email type");
  }

  const mailOptions = {
    from: "Opt.national team",
    to: data.user.email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
