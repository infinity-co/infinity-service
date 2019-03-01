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

  app.get('/subscriptions/:id', middlewares.authenticated, subscriptionsController.get)

  app.get('/subscriptions', middlewares.authenticated, subscriptionsController.getAll)

  app.put('/subscriptions/:id', middlewares.authenticated, subscriptionsController.edit)

  app.delete('/subscriptions/:id', middlewares.authenticated, subscriptionsController.delete)
}

module.exports = subscriptionsRoute
