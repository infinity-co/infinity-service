// Helpers
const findOneUser = require('../../../helpers/find-one-user')
const createUser = require('../../../helpers/create-user')
const sendVerifyAccountEmail = require('../../../helpers/send-verify-account-email')

const register = async (req, res) => {
  const { email } = req.body

  let user = await findOneUser({ email })

  if (user) {
    await sendVerifyAccountEmail(user)
    return res.status(200).send({ data: user })
  }

  try {
    user = await createUser(email)
    await sendVerifyAccountEmail(user)

    res.status(200).send({ data: user })
  } catch (error) {
    console.error({ error })
    res.status(400).send({ error })
  }
}

module.exports = register
