// Packages
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')

require('dotenv').load()

// Config
const config = require('./config')

// Libs
const connectDatabase = require('./helpers/connect-database')
const routes = require('./routes')

const app = express()

const origin = config.corsOrigin ? config.corsOrigin.split(',') : []
const corsOptions = { origin }

mongoose.Promise = global.Promise

connectDatabase()

app.config = config
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(expressValidator())
app.set('port', config.port || process.env.PORT)
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

routes(app)

app.listen(app.get('port'), () => {
  console.log(
    `Infinity service is listening on port ${app.get(
      'port'
    )} (http://localhost:${app.get('port')})`
  )
  console.log(`Environment ${app.get('env')}`)
})

module.exports = app
