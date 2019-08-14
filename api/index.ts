// Utils
import { app } from '../utils/app'

// Root
import pkg from '../package.json'

app.get('/', async (req, res) => {
  res.send({ name: pkg.name, description: pkg.description, version: pkg.version })
})

export default app