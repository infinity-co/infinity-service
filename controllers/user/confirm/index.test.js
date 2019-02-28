// Packages
const assert = require('assert')
const request = require('supertest')

// Root
const server = require('../../../server')

// Helpers
const generateConfirmationToken = require('../../../helpers/generate-confirmation-token')
const createToken = require('../../../helpers/create-token')
const resetDatabase = require('../../../helpers/reset-database')

// Fixtures
const addUser = require('../../../fixtures/add-user')

describe('Confirm user', () => {
  beforeEach(done => {
    resetDatabase()
      .then(done)
      .catch(done)
  })

  let token

  it('should confirm user account', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      token = await generateConfirmationToken()
      await createToken(user._id, token)

      request(server)
        .get(`/user/confirm?token=${token}`)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          assert.strictEqual(res.body.data.message, 'Token updated')

          resolve()
        })
    })
  })

  it('should not confirm user account twice', () => {
    return new Promise(async (resolve, reject) => {
      request(server)
        .get(`/user/confirm?token=${token}`)
        .expect(400)
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          assert.strictEqual(res.body.error.message, 'Token is invalid')

          resolve()
        })
    })
  })

  // TODO: it('should check if user email was confirmed')

  it('should not confirm user account without token', () => {
    return new Promise(async (resolve, reject) => {
      request(server)
        .get('/user/confirm')
        .expect(400)
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          assert.strictEqual(res.body.error.message, 'Token is invalid')

          resolve()
        })
    })
  })
})
