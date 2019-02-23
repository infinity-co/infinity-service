// Services
const mailer = require('../../services/mailer')

// Helpers
const generateConfirmationToken = require('../generate-confirmation-token')
const createToken = require('../create-token')

// Config
const { host } = require('../../config')

module.exports = async user => {
  if (user) {
    const confirmationToken = await generateConfirmationToken()
    await createToken(user.id, confirmationToken)

    const mailOptions = {
      to: user.email,
      subject: 'Welcome — please confirm your email | Infinity',
      text: `${host}/account/confirm?token=${confirmationToken}`
    }

    return mailer.sendMail(mailOptions, error => {
      if (error) {
        return new TypeError(error)
      }
    })
  }

  throw new TypeError('User is required')
}
