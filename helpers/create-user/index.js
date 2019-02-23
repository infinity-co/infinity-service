// Models
const UserModel = require('../../models/user')

// Helpers
const generateToken = require('../generate-token')

const createUser = email => {
  return new Promise((resolve, reject) => {
    const user = new UserModel({ email })
    const token = generateToken(user.id)

    user.token = token

    user.save(error => {
      if (error) {
        return reject(error)
      }

      resolve(user)
    })
  })
}

module.exports = createUser
