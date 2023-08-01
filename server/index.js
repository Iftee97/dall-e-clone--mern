import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import connectDb from './mongodb/connect.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/user', userRoutes)
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E clone backend' })
})

const startServer = () => {
  try {
    connectDb(process.env.MONGODB_URL)
    app.listen(8080, () => {
      console.log('Server running on port 8080')
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
