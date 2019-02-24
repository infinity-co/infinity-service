// Controllers
const userController = require('../../controllers/user')

const userRoute = app => {
  app.post(
    '/user/register',
    userController.validator.register,
    userController.register
  )
}

module.exports = userRoute
