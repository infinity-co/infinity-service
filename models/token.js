// Packages
const mongoose = require('mongoose')
const Promise = require('bluebird')

const schemaOptions = { timestamps: true }

const tokenSchema = new mongoose.Schema(
  {
    token: String,
    userId: String,
    used: { type: Boolean, default: false },
    expired: { type: Boolean, default: false },
    expiresAt: Date,
    email: String,
    metadata: Object
  },

  schemaOptions
)

const Token = mongoose.model('Token', tokenSchema)

Token.findOneAndUpdateAsync = Promise.promisify(Token.findOneAndUpdate)

module.exports = Token
