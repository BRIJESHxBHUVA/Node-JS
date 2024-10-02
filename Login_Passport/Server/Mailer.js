const Mailer = require('nodemailer')

const transport = Mailer.createTransport({
    service: 'gmail',
    auth: {
        user: "bhuvabrijesh14@gmail.com",
        pass: "fida dbul igrh cvnw"
    }
})

module.exports.sendOtp = (to, otp)=> {
    const mailOptions = {
        from: "bhuvabrijesh14@gmail.com",
        to: to,
        subject: "Reset Password Conformation OTP",
        text: `Your Password Recovery OTP is ${otp}`
    }
    transport.sendMail(mailOptions, (err)=> {
        err && console.log(err)
    })
}