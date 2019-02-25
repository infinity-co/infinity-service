// Packages
const request = require('supertest')

// Root
const server = require('../server')

const addUser = ({ email } = {}) => {
  return new Promise((resolve, reject) => {
    const payload = { email }

    request(server)
      .post('/user/register')
      .send(payload)
      .expect(200)
      .end((error, res) => {
        if (error) {
          return reject(error)
        }

        resolve(res.body.data)
      })
  })
}

module.exports = addUser
