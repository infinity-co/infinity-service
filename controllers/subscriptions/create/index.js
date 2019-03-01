// Models
const SubscriptionModel = require('../../../models/subscription')

const create = (req, res) => {
  const { user, body } = req
  const { name, price, cycle, expireAt, startAt, currency = user.currency } = body

  const subscription = new SubscriptionModel({
    name,
    price,
    cycle,
    expireAt,
    startAt,
    currency,
    owner: user._id
  })

  subscription.save(error => {
    if (error) {
      return res.status(500).send({ error: { message: error } })
    }

    res.status(200).send({ data: { subscription } })
  })
}

module.exports = create
