// Packages
const jwt = require('jsonwebtoken')

// Config
const config = require('../../config')

const populateUser = async (req, res, next) => {
  req.isAuthenticated = () => {
    const token = req.headers.authorization

    try {
      return jwt.verify(token, config.tokenSecret)
    } catch (error) {
      return false
    }
  }

  if (req.isAuthenticated()) {
    const payload = req.isAuthenticated()

    req.user = payload.sub
  }

  return next()
}

module.exports = populateUser
