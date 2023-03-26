const nodemailer = require("nodemailer");

const sendEmail = async () => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nodemailtest0451@gmail.com",
      pass: "obecdbodoifhctvo",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"nodemailtest0451@gmail.com', // sender address
    to: "trunghieu0451@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
