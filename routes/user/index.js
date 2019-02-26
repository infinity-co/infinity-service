// Controllers
const userController = require('../../controllers/user')

// Middlewares
const middlewares = require('../../middlewares')

const userRoute = app => {
  app.post(
    '/user/register',
    userController.validator.register,
    userController.register
  )

  app.get('/user/confirm', userController.confirm)

  app.get('/user/verify', middlewares.authenticated, userController.verify)
}

module.exports = userRoute
