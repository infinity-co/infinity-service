// Packages
const request = require('supertest')

// Root
const server = require('../server')

const addSubscription = ({ token } = {}) => {
  return new Promise((resolve, reject) => {
    const payload = {
      name: 'Spotify',
      price: 799,
      cycle: 'monthly',
      expireAt: new Date(),
      startAt: new Date()
    }

    request(server)
      .post('/subscriptions/new')
      .set('Authorization', token)
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

module.exports = addSubscription
