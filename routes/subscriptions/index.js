// Controllers
const subscriptionsController = require('../../controllers/subscriptions')

// Middlewares
const middlewares = require('../../middlewares')

const subscriptionsRoute = app => {
  app.post(
    '/subscriptions/new',
    middlewares.authenticated,
    subscriptionsController.validator.create,
    subscriptionsController.create
  )

  app.put('/subscriptions/:id', middlewares.authenticated, subscriptionsController.edit)
}

module.exports = subscriptionsRoute
