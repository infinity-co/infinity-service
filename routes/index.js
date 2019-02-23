// Package
const { name, version, description } = require('../package')

// Routes
const healthRoute = require('./health')

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({
      name,
      version,
      description,
      environment: process.env.NODE_ENV
    })
  })

  healthRoute(app)
}
