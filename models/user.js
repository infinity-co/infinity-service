// Packages
const mongoose = require('mongoose')

const schemaOptions = {
  timestamps: true
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    emailConfirmed: { type: Boolean, default: false },
    currency: { type: String, default: 'usd' },
    token: String
  },
  schemaOptions
)

const User = mongoose.model('User', userSchema)

module.exports = User
