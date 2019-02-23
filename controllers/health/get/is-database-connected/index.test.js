// Controllers
const isDatabaseConnencted = require('.')

test('database connection', () => {
  expect(isDatabaseConnencted()).toBe(false)
})
