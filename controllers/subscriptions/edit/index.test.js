// Packages
const assert = require('assert')
const request = require('supertest')

// Server
const server = require('../../../server')

// Helpers
const generateConfirmationToken = require('../../../helpers/generate-confirmation-token')
const createToken = require('../../../helpers/create-token')
const resetDatabase = require('../../../helpers/reset-database')

// Fixtures
const addUser = require('../../../fixtures/add-user')
const addSubscription = require('../../../fixtures/add-subscription')

describe('Update subscription', () => {
  beforeEach(done => {
    resetDatabase()
      .then(done)
      .catch(done)
  })

  it('should update a subscription', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)
      const { subscription } = await addSubscription({ token: user.token })
      const payload = { name: 'Apple Music' }

      request(server)
        .put(`/subscriptions/${subscription._id}`)
        .set('Authorization', user.token)
        .send(payload)
        .expect(200)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert.strictEqual(res.body.data.message, 'Subscription updated')

          resolve()
        })
    })
  })
})
