const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SG_API_KEY)

// sgMail.send({
//     to: 'toEmail',
//     from: 'fromEmail',
//     subject: 'Yay it works!',
//     text: 'Just a test.'
// })

module.exports = {
    sendWelcomeEmail(email, name) {
        sgMail.send({
            to: email,
            from: 'fromEmail',
            subject: 'Welcome!',
            text: `Hello ${name}!`
        })
    },
    sendCancellationEmail(email) {
        sgMail.send({
            to: email,
            from: 'fromEmail',
            subject: 'Why did you leave us?',
            text: `Why did you decide to leave us?`
        })
    }
}