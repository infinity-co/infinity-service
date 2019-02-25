// Helpers
const findOneToken = require('../../../helpers/find-one-token')
const updateToken = require('../../../helpers/update-token')

module.exports = async (req, res) => {
  const { user } = req

  if (user) {
    const token = await findOneToken(user._id, { createdAt: -1 })

    if (token && token.used && !token.expired) {
      await updateToken(token, { expired: true })

      return res.status(200).send({ data: { status: true } })
    }
  }

  res.status(200).send({ data: { status: false } })
}
