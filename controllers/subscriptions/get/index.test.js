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

describe('Get subscription', () => {
  beforeEach(done => {
    resetDatabase()
      .then(done)
      .catch(done)
  })

  it('should get a subscription', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)
      const { subscription } = await addSubscription({ token: user.token })

      request(server)
        .get(`/subscriptions/${subscription._id}`)
        .set('Authorization', user.token)
        .expect(200)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert(res.body.data.subscription._id)
          assert(res.body.data.subscription.name)
          assert(res.body.data.subscription.price)
          assert(res.body.data.subscription.cycle)
          assert(res.body.data.subscription.expireAt)
          assert(res.body.data.subscription.startAt)
          assert(res.body.data.subscription.currency)
          assert(res.body.data.subscription.owner)

          resolve()
        })
    })
  })
})
