// Models
const TokenModel = require('../../models/token')

const findAndUpdateToken = async (query, update, options) => {
  try {
    const token = await TokenModel.findOneAndUpdateAsync(query, update, options)
    return token
  } catch (error) {
    console.error({ error })
  }
}

module.exports = findAndUpdateToken
