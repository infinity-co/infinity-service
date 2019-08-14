// Utils
import { app } from '../../utils/app'
import { connectDatabase } from '../../utils/connect-database'

app.get('/health', async (req, res) => {
  const isConnected = await connectDatabase()

  if (isConnected) {
    return res.status(200).send({ up: true })
  }

  return res.status(500).send({ up: false })
})

export default app
