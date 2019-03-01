// Packages
const jwt = require('jsonwebtoken')

// Root
const pkg = require('../../package')

// Config
const { tokenSecret } = require('../../config')

const generateToken = user => {
  if (user) {
    const now = new Date()
    const expire = new Date(now)
    expire.setDate(expire.getDate() + 15)
    const iat = parseInt((now.getTime() / 1000).toFixed(0), 0)
    const exp = parseInt((expire / 1000).toFixed(0), 0)

    const payload = {
      iss: pkg.name,
      sub: user,
      iat,
      exp
    }

    return jwt.sign(payload, tokenSecret)
  }

  throw new TypeError('User id is required')
}

module.exports = generateToken
