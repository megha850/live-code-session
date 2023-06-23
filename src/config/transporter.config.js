import nodemailer from "nodemailer"

import config from "./index.js"

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: config.SMTP_MAIL_USERNAME, // generated ethereal user
      pass: config.SMTP_MAIL_PASSWORD, // generated ethereal password
    },
  });

  export default transporter