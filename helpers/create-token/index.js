// Models
const TokenModel = require('../../models/token')

const createToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    if (userId && token) {
      const tkn = new TokenModel({ userId, token })

      return tkn.save(error => {
        if (error) {
          return reject(error)
        }

        return resolve()
      })
    }

    reject(new TypeError('User id and token are required'))
  })
}

module.exports = createToken