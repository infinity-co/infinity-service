// Helpers
const findAndUpdateToken = require('../../../helpers/find-and-update-token')

const confirm = async (req, res) => {
  const { token } = req.query
  const query = { token, used: false, expired: false }
  const update = { used: true }
  const options = { new: true }

  if (token) {
    const tkn = await findAndUpdateToken(query, update, options)

    if (tkn) {
      return res.status(200).send({ data: { message: 'Token updated' } })
    }
  }

  res.status(400).send({ error: { message: 'Token is invalid' } })
}

module.exports = confirm
