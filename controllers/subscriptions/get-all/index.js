// Models
const SubscriptionModel = require('../../../models/subscription')

const getAll = async (req, res) => {
  try {
    const { user } = req

    const subscriptions = await SubscriptionModel.findAsync({
      owner: user._id
    })

    res.status(200).send({ data: { subscriptions, total: subscriptions.length } })
  } catch (error) {
    res.status(500).send({ error: { message: error } })
  }
}

module.exports = getAll
