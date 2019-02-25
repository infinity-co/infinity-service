// Packages
const assert = require('assert')

// Controllers
const isDatabaseConnencted = require('.')

describe('is database connection', () => {
  it('should check if database is connected', done => {
    assert.strictEqual(isDatabaseConnencted(), false)
    done()
  })
})
