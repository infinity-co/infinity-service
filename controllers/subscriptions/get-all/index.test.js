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

describe('Get subscriptions', () => {
  beforeEach(done => {
    resetDatabase()
      .then(done)
      .catch(done)
  })

  it('should get subscriptions', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const user2 = await addUser({ email: 'bukinoshita2@gmail.com' })
      const token = await generateConfirmationToken()
      const token2 = await generateConfirmationToken()
      await createToken(user._id, token)
      await createToken(user2._id, token2)
      await addSubscription({ token: user.token })
      await addSubscription({ token: user2.token })

      request(server)
        .get('/subscriptions')
        .set('Authorization', user.token)
        .expect(200)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert(res.body.data.subscriptions)
          assert(res.body.data.total === 1)

          resolve()
        })
    })
  })
})
