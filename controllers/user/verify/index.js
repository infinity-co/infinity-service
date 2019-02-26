// Helpers
const findOneAndUpdateToken = require('../../../helpers/find-and-update-token')

const verify = async (req, res) => {
  const { user } = req

  if (user) {
    const token = await findOneAndUpdateToken(
      { userId: user._id, used: true, expired: false },
      { expired: true },
      { sort: { createdAt: -1 }, new: true }
    )

    if (token && token.used && token.expired) {
      return res.status(200).send({ data: { status: true } })
    }
  }

  res.status(200).send({ data: { status: false } })
}

module.exports = verify
