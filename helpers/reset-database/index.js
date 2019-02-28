// Packages
const Promise = require('bluebird')

// Models
const UserModel = Promise.promisifyAll(require('../../models/user'))
const TokenModel = Promise.promisifyAll(require('../../models/token'))

const env = process.env.NODE_ENV || 'development'

module.exports = () => {
  if (env === 'test') {
    return new Promise((resolve, reject) => {
      Promise.all([UserModel.deleteMany({}), TokenModel.deleteMany({})])
        .then(() => resolve())
        .catch(error => reject(error))
    })
  }
}