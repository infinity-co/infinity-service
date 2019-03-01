// Models
const SubscriptionModel = require('../../../models/subscription')

const del = async (req, res) => {
  try {
    const { params, user } = req
    const query = { _id: params.id, owner: user._id }

    const subscription = await SubscriptionModel.removeAsync(query)

    if (subscription.n >= 1) {
      return res.status(200).send({ data: { message: 'Subscription deleted' } })
    }

    res.status(404).send({ error: { message: 'Subscription not found' } })
  } catch (error) {
    res.status(500).send({ error: { message: error } })
  }
}

module.exports = del
