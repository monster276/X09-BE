const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {
  // let testAccount = await nodemailer.createTestAccount()
  // const { email } = req.body
  // let transporter = nodemailer.createTransport({
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   auth: {
  //     user: 'norval.ortiz59@ethereal.email',
  //     pass: 'AdEJDtsRHNKmerntjS',
  //   },
  // })

  // // send mail with defined transport object
  // let info = await transporter.sendMail(
  //   {
  //     from: 'norval.ortiz59@ethereal.email', // sender address
  //     to: `${email}`, // list of receivers
  //     subject: 'Hello ✔', // Subject line
  //     text: 'Cảm ơn bạn đã đăng ký khoá học ABC tại cơ sở XYZ', // plain text body
  //     html: '<b>Hello world?</b>', // html body
  //   },
  //   (err) => {
  //     if (err) {
  //       return res.json({
  //         message: 'Khong gui duoc',
  //         err,
  //       })
  //     }
  //     return res.json({
  //       message: 'Gui thanh cong email',
  //     })
  //   },
  // )

  /////WITH GMAIL
  const nodemailer = require('nodemailer')
  const { email } = req.body
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
    subject: 'Invoices due',
    text:
      'Cảm ơn bạn đã lựa chọn chúng tôi, yêu cầu đăng ký khoá học của bạn đã được xác nhận. Chúng tôi sẽ liên hệ với bạn sau khi lớp học được tạo',
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
