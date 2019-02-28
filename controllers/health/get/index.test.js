// Packages
const assert = require('assert')
const request = require('supertest')

// Root
const server = require('../../../server')

describe('Health check', () => {
  it('should check if the database is up', done => {
    request(server)
      .get('/health')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return console.error(err)
        }

        assert.strictEqual(res.body.data.status, 'up')
        done()
      })
  })
})
