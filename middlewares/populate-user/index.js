// Packages
const jwt = require('jsonwebtoken')

// Models
const UserModel = require('../../models/user')

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
    const user = await UserModel.findByIdAsync(payload.sub)

    req.user = user
  }

  return next()
}

module.exports = populateUser
