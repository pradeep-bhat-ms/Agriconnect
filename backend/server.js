import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddlware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import supplierRoutes from './routes/supplierRoutes.js'
import customRoutes from './routes/customRoutes.js'
import seedRoutes from './routes/seedRoutes.js'
import lendMachineRoutes from './routes/lendMachineRoutes.js'
import consumerRoutes from './routes/consumerRoutes.js'

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// Mount routes (note: each route file uses '/' internally)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/supplier', supplierRoutes)
app.use('/api/custom', customRoutes)
app.use('/api/seeds', seedRoutes)
app.use('/api/lendMachines', lendMachineRoutes)
app.use('/api/consumer', consumerRoutes)

// PayPal config
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})

// Static uploads
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

// Errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})
