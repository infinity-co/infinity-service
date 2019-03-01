// Packages
const mongoose = require('mongoose')
const Promise = require('bluebird')

const schemaOptions = { timestamps: true }

const subscriptionSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    cycle: String,
    expireAt: Date,
    startAt: Date,
    currency: String,
    owner: mongoose.Schema.Types.ObjectId
  },
  schemaOptions
)

const Subscription = mongoose.model('Subscription', subscriptionSchema)

Subscription.findOneAndUpdateAsync = Promise.promisify(Subscription.findOneAndUpdate)
Subscription.findOneAsync = Promise.promisify(Subscription.findOne)
Subscription.findAsync = Promise.promisify(Subscription.find)
Subscription.removeAsync = Promise.promisify(Subscription.remove)

module.exports = Subscription
