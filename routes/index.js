// Package
const { name, version, description } = require('../package')

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({
      name,
      version,
      description,
      environment: process.env.NODE_ENV
    })
  })
}
