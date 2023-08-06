import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import connectDb from './mongodb/connect.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 8080

// connect to database
connectDb(process.env.MONGODB_URL)

// middlewares
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// routes
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

// default route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' })
})

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
