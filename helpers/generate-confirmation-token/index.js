// Packages
const crypto = require('crypto')
const Promise = require('bluebird')

crypto.randomBytesSync = Promise.promisify(crypto.randomBytes)

const generateConfirmationToken = async () => {
  const buffer = await crypto.randomBytesSync(30)
  const confirmationToken = buffer.toString('hex')

  return confirmationToken
}

module.exports = generateConfirmationToken
