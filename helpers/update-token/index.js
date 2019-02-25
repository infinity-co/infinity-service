// Packages
const TokenModel = require('../../models/token')

const updateToken = async (query = {}, update = {}, options = {}) => {
  try {
    const token = await TokenModel.updateAsync(query, update, options)
    return token
  } catch (error) {
    console.error(error)
  }
}

module.exports = updateToken
