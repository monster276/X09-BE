const nodemailer = require("nodemailer");

const sendEmailForClassroom = async (student, course) => {
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
    to: student, // list of receivers
    subject: `THÔNG BÁO KHAI GIẢNG LỚP ${course}`, // Subject line
    text: "Hello world?", // plain text body
    html: `<h1> THÔNG BÁO KHAI GIẢNG LỚP ${course} </h1>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmailForClassroom;
