const Mailer = require('nodemailer')

const transport = Mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bhuvabrijesh14@gmail.com',
        pass: 'fida dbul igrh cvnw'
    }
})

module.exports.sendotp = (to, otp)=> {
    const mailOption = {
        from: 'bhuvabrijesh14@gmail.com',
        to: to,
        subject: 'Confirmation OTP for reset password',
        text: `Your Password Recovery OTP is ${otp}`
    }
    transport.sendMail(mailOption, (err)=> {
        err & console.log(err)
    })
}