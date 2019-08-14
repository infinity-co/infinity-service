// Packages
import mongoose from 'mongoose'

// Config
import config from '../config'

mongoose.Promise = global.Promise

let isConnected = null
const uri = `mongodb+srv://${config.database.username}:${config.database.password}@${config.database.cluster}?${config.database.options}`

export async function connectDatabase() {
  if (isConnected) {
    Promise.resolve()
    return isConnected
  }

  try {
    const db = await mongoose.connect(uri, { useNewUrlParser: true })
    const dbStatus = db.connections[0].readyState

    isConnected = dbStatus

    return dbStatus
  } catch (err) {
    console.error('> error connecting database', err)
  }
}
