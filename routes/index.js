// Package
const { name, version, description } = require('../package')

// Middlewares
const middlewares = require('../middlewares')

// Routes
const userRoute = require('./user')
const subscriptionsRoute = require('./subscriptions')
const healthRoute = require('./health')

module.exports = app => {
  app.use(middlewares.populateUser)
  app.use(middlewares.sanitizer)

  app.get('/', (req, res) => {
    res.send({
      name,
      version,
      description,
      environment: process.env.NODE_ENV
    })
  })

  userRoute(app)
  subscriptionsRoute(app)
  healthRoute(app)
}
