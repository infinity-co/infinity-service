// Packages
const request = require('supertest')

// Root
const server = require('../server')

const confirmUser = ({ token } = {}) => {
  return new Promise((resolve, reject) => {
    request(server)
      .get(`/user/confirm?token=${token}`)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return reject(error)
        }

        resolve(res.body.data)
      })
  })
}

module.exports = confirmUser
