// Packages
const Mailgun = require('mailgun-js')

// Config
const { mailer } = require('../config')

const { apiKey, domain, from } = mailer
const mailgun = new Mailgun({ apiKey, domain })

const transporter = {
  sendMail: data => {
    data.from = from

    mailgun.messages().send(data, error => {
      if (error) {
        return new TypeError(error)
      }
    })
  }
}

module.exports = transporter
