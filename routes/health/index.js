// Controllers
const healthController = require('../../controllers/health')

const healthRoute = app => {
  app.get('/health', healthController.get)
}

module.exports = healthRoute
