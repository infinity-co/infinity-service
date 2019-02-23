// Healthcheck
const isDatabaseConnencted = require('./is-database-connected')

const get = (req, res) => {
  if (isDatabaseConnencted()) {
    return res.status(200).send({ data: { status: 'up' } })
  }

  res.status(500).send({
    status: 'down',
    results: [
      {
        error: 'Database connection'
      }
    ]
  })
}

module.exports = get
