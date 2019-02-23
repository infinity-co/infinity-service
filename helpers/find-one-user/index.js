// Models
const UserModel = require('../../models/user')

const findOneUser = async query => {
  try {
    const user = await UserModel.findOneAsync(query)
    return user
  } catch (error) {
    console.error({ error })
  }
}

module.exports = findOneUser
