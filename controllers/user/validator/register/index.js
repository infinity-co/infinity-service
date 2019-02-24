const register = (req, res, next) => {
  req.assert('email', 'Email is required').notEmpty()
  req.assert('email', 'Email is not valid').isEmail()
  req.sanitize('email').normalizeEmail({ removeDots: false })

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).send({ error: { message: errors[0].msg } })
  }

  next()
}

module.exports = register
