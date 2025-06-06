import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});


const sendEmail = async (email, subject, html) => {
  // switch (type) {
  //   case "signup":
  //     subject = "Welcome to Our Opt.national!";
  //     html = createSignupMailHtml(data);
  //     break;
    
  //     case "verifyUser":
  //       subject = "Your verification otp"
  //       html = createSignupMailHtml(data)

  //   case "subscription":
  //     subject = "Subscription Confirmed!";
  //     html = createSignupVerificationHtml(data);
  //     break;

  //   case "otp":
  //     subject = "Your Password Reset OTP";
  //     html = createOtpMailHtml(data);
  //     break;

  //   default:
  //     throw new Error("Unknown email type");
  // }

  const mailOptions = {
    from: "Opt.national team",
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
