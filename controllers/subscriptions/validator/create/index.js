const create = (req, res, next) => {
  req.assert('name', 'Name is required').notEmpty()
  req.assert('price', 'Price is required').notEmpty()
  req.assert('cycle', 'Cycle is required').notEmpty()
  req.assert('expireAt', 'Expire date is required').notEmpty()
  req.assert('startAt', 'Start date is required').notEmpty()

  const errors = req.validationErrors()

  if (errors) {
    return res.status(400).send({ error: { message: errors[0].msg } })
  }

  next()
}

module.exports = create
