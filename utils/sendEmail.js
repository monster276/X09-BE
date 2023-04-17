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
      user: 'ls2023.ln@gmail.com',
      pass: 'vuquanghieu276195', // naturally, replace both with your real credentials or an application-specific password
    },
  })

  const mailOptions = {
    from: 'ls2023.ln@gmail.com',
    to: `${email}`,
    subject: 'Invoices due',
    text: 'Dudes, we really need your money.',
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = sendEmail
