// Packages
const Mailgun = require('mailgun-js')

// Config
const { mailer } = require('../config')

const { apiKey, domain, from } = mailer
const mailgun = new Mailgun({ apiKey, domain })

const env = process.env.NODE_ENV || 'development'

const transporter = {
  sendMail: data => {
    if (env === 'test') {
      return console.info(`Email sent to ${data.to}`)
    }

    data.from = from

    mailgun.messages().send(data, error => {
      if (error) {
        return new TypeError(error)
      }
    })
  }
}

module.exports = transporter
