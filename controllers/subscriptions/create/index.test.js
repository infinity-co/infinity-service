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

describe('Create subscription', () => {
  beforeEach(done => {
    resetDatabase()
      .then(done)
      .catch(done)
  })

  it('should create a subscription', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)

      const payload = {
        name: 'Spotify',
        price: 799,
        cycle: 'monthly',
        expireAt: new Date(),
        startAt: new Date()
      }

      request(server)
        .post('/subscriptions/new')
        .set('Authorization', user.token)
        .send(payload)
        .expect(200)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert.strictEqual(res.body.data.subscription.name, payload.name)
          assert.strictEqual(res.body.data.subscription.price, payload.price)
          assert.strictEqual(res.body.data.subscription.cycle, payload.cycle)
          assert.strictEqual(res.body.data.subscription.currency, 'usd')
          assert(res.body.data.subscription.owner)

          resolve()
        })
    })
  })

  it('should not create subscription without name', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)

      const payload = {
        price: 799,
        cycle: 'monthly',
        expireAt: new Date(),
        startAt: new Date()
      }

      request(server)
        .post('/subscriptions/new')
        .set('Authorization', user.token)
        .send(payload)
        .expect(400)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert.strictEqual(res.body.error.message, 'Name is required')

          resolve()
        })
    })
  })

  it('should not create subscription without price', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)

      const payload = {
        name: 'Spotify',
        cycle: 'monthly',
        expireAt: new Date(),
        startAt: new Date()
      }

      request(server)
        .post('/subscriptions/new')
        .set('Authorization', user.token)
        .send(payload)
        .expect(400)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert.strictEqual(res.body.error.message, 'Price is required')

          resolve()
        })
    })
  })

  it('should not create subscription without cycle', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)

      const payload = {
        name: 'Spotify',
        price: 799,
        expireAt: new Date(),
        startAt: new Date()
      }

      request(server)
        .post('/subscriptions/new')
        .set('Authorization', user.token)
        .send(payload)
        .expect(400)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert.strictEqual(res.body.error.message, 'Cycle is required')

          resolve()
        })
    })
  })

  it('should not create subscription without expireAt', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)

      const payload = {
        name: 'Spotify',
        price: 799,
        cycle: 'monthly',
        startAt: new Date()
      }

      request(server)
        .post('/subscriptions/new')
        .set('Authorization', user.token)
        .send(payload)
        .expect(400)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert.strictEqual(res.body.error.message, 'Expire date is required')

          resolve()
        })
    })
  })

  it('should not create subscription without startAt', () => {
    return new Promise(async (resolve, reject) => {
      const user = await addUser({ email: 'bukinoshita@gmail.com' })
      const token = await generateConfirmationToken()
      await createToken(user._id, token)

      const payload = {
        name: 'Spotify',
        price: 799,
        cycle: 'monthly',
        expireAt: new Date()
      }

      request(server)
        .post('/subscriptions/new')
        .set('Authorization', user.token)
        .send(payload)
        .expect(400)
        .end((error, res) => {
          if (error) {
            console.error({ error })
            return reject(error)
          }

          assert.strictEqual(res.body.error.message, 'Start date is required')

          resolve()
        })
    })
  })
})
