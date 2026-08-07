import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Port 465 ஆக இருந்தால் இது கட்டாயம் true ஆக இருக்க வேண்டும்
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_MAIL_NAME} <${process.env.SMTP_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message, // சாதாரண டெக்ஸ்ட் மெசேஜ்
    html: options.messageHTML || options.message, // அழகான HTML டிசைன் இருந்தால் அதைப் பயன்படுத்தும்
  };

  await transporter.sendMail(message);
};

export default sendEmail;