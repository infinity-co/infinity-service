// Packages
import express from 'express'

// Middlewares
import { middlewares } from '../middlewares'

const app: express.Application = require('express')()

require('dotenv').config()

app.set('trust proxy', 1)
app.use(...middlewares)

export { app }
