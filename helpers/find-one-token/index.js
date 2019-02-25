// Packages
const TokenModel = require('../../models/token')

const findOneToken = async (query, options) => {
  try {
    const token = await TokenModel.findOneAsync(query, options)

    return token
  } catch (error) {
    console.error({ error })
  }
}

module.exports = findOneToken
