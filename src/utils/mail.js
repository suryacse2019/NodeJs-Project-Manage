import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const mail = {
    from: "mail.taskmanage@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed. make sure that you provide yopur mailtrap crediatials in the .env file",
    );
    console.error("Error :", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
   return {
    body: {
      name: username,
      intro: "Welcome to our application, we're excited to have you on board.",
      action: {
        instructions: "To verify your email please click the button below:",
        button: {
          color: "#1aae5a",
          text: "Verify Email", 
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordRestUrl) => {
  return {
    body: {
      name: username,
      intro: "We received a request to reset your password.",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#1aae5a",
          text: "Reset password",
          link: passwordRestUrl,
        },
      },
      outro:
        "Need help, or have questions? just reply ti this email, web'd love to help ",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
