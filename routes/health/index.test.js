// Packages
const request = require('supertest')

// Root
const server = require('../../server')

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(server).get('/health')
    expect(response.statusCode).toBe(200)
  })
})
