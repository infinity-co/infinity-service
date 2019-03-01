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

describe('Delete subscription', () => {
  beforeEach(done => {
    resetDatabase()
      .then(done)
      .catch(done)
  })

  it('should delete a subscription', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)
      const { subscription } = await addSubscription({ token: user.token })

      request(server)
        .delete(`/subscriptions/${subscription._id}`)
        .set('Authorization', user.token)
        .expect(200)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert.strictEqual(res.body.data.message, 'Subscription deleted')

          resolve()
        })
    })
  })
})
