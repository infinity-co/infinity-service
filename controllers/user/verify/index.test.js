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
const confirmUser = require('../../../fixtures/confirm-user')

describe('Verify user', () => {
  beforeEach(done => {
    resetDatabase()
      .then(done)
      .catch(done)
  })

  let user

  it('should verify a user', () => {
    return new Promise(async (resolve, reject) => {
      user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)
      await confirmUser({ token })

      request(server)
        .get('/user/verify')
        .set('Authorization', user.token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          assert.strictEqual(res.body.data.status, true)

          resolve()
        })
    })
  })

  it('should not verify a user twice', () => {
    return new Promise(async (resolve, reject) => {
      request(server)
        .get('/user/verify')
        .set('Authorization', user.token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          assert.strictEqual(res.body.data.status, false)

          resolve()
        })
    })
  })

  it('should not verify a user without token', () => {
    return new Promise(async (resolve, reject) => {
      request(server)
        .get('/user/verify')
        .expect(401)
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          assert.strictEqual(res.body.error.message, 'Unauthorized')

          resolve()
        })
    })
  })
})
