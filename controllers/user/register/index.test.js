// Packages
const assert = require('assert')
const request = require('supertest')

// Root
const server = require('../../../server')

// Helpers
const resetDatabase = require('../../../helpers/reset-database')

describe('Register user', () => {
  beforeEach(done => {
    resetDatabase()
      .then(done)
      .catch(done)
  })

  it('should register a user', done => {
    const payload = { email: 'bukinoshita@gmail.com' }

    request(server)
      .post('/user/register')
      .send(payload)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return console.error(err)
        }

        assert.strictEqual(res.body.data.emailConfirmed, false)
        assert.strictEqual(res.body.data.currency, 'usd')
        assert.strictEqual(res.body.data.email, payload.email)
        assert(res.body.data.token)

        done()
      })
  })

  it('should not register a user when email is missing', done => {
    const payload = {}

    request(server)
      .post('/user/register')
      .send(payload)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return console.error(err)
        }

        assert.strictEqual(res.body.error.message, 'Email is required')

        done()
      })
  })

  it('should not register a user when email is wrong', done => {
    const payload = { email: 'bukinoshita' }

    request(server)
      .post('/user/register')
      .send(payload)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return console.error(err)
        }

        assert.strictEqual(res.body.error.message, 'Email is not valid')

        done()
      })
  })
})
