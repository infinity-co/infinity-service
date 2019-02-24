// Package
const { name, version, description } = require('../package')

// Routes
const userRoute = require('./user')
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

  userRoute(app)
  healthRoute(app)
}
