const nodemailer = require('nodemailer')

const sendEmail = async (email, course, location, name) => {
  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodemailtest0451@gmail.com',
      pass: 'obecdbodoifhctvo', // naturally, replace both with your real credentials or an application-specific password
    },
  })

  const mailOptions = {
    from: 'nodemailtest0451@gmail.com',
    to: `${email}`,
    subject: 'XÁC NHẬN ĐĂNG KÍ KHOÁ HỌC',
    text: `Confirm Email`,
    html: `<div>
            <h3>
            Dear ${name} <br/>
            Cảm ơn bạn đã lựa chọn chúng tôi! <br/>
            Yêu cầu đăng ký khoá học ${course}, tại cơ cở ${location} của bạn đã được xác nhận <br/>
            Chúng tôi sẽ liên hệ với bạn ngay sau khi lớp học được tạo
            </h3>
            <img src="https://unia.vn/wp-content/uploads/2022/11/Thieu-tieu-de-mail.jpg" alt="" />
            <h3>Thank you and best regard</h3>
          </div>`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.status(500).json(err)
    } else {
      console.log('Email sent: ' + info.response)
      res.json({ status: 'Email sent', mailOptions })
    }
  })
}

module.exports = sendEmail
