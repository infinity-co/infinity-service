// Models
const SubscriptionModel = require('../../../models/subscription')

const edit = async (req, res) => {
  try {
    const { user, body, params } = req
    const query = { _id: params.id, owner: user._id }

    await SubscriptionModel.findOneAndUpdateAsync(query, body)

    res.status(200).send({ data: { message: 'Subscription updated' } })
  } catch (error) {
    console.error({ error })

    res.status(500).send({ error: { message: error } })
  }
}

module.exports = edit
