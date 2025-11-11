import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import ConsumerProducts from '../models/consumerProductModel.js'

// GET /api/consumer
export const getConsumerProducts = asyncHandler(async (_req, res) => {
  const items = await ConsumerProducts.find({})
  res.json(items)
})

// GET /api/consumer/:id
export const getConsumerProductById = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid consumer product id' })
  }

  const item = await ConsumerProducts.findById(id)
  if (!item) return res.status(404).json({ message: 'Consumer Product not Found' })
  res.json(item)
})

// DELETE /api/consumer/:id
export const deleteConsumerProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid consumer product id' })
  }

  const item = await ConsumerProducts.findById(id)
  if (!item) return res.status(404).json({ message: 'Consumer Product not Found' })

  await item.deleteOne()
  res.json({ message: 'Consumer product removed' })
})

// POST /api/consumer
export const createConsumer = asyncHandler(async (req, res) => {
  const item = new ConsumerProducts({
    prod_name: 'Sample name',
    user: req.user?._id,
    seller_name: 'Sample seller',
    image: '/images/consumer/mogra_rice.jpg',
    price: 0,
    prod_size: '0kg',
    quantity: 0,
    avalaible_location: 'Sample location',
  })
  const created = await item.save()
  res.status(201).json(created)
})

// PUT /api/consumer/:id
export const updateConsumer = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid consumer product id' })
  }

  const item = await ConsumerProducts.findById(id)
  if (!item) return res.status(404).json({ message: 'Product not found' })

  const { prod_name, price, image, seller_name, prod_size, quantity, avalaible_location } = req.body
  item.prod_name = prod_name ?? item.prod_name
  item.price = price ?? item.price
  item.image = image ?? item.image
  item.seller_name = seller_name ?? item.seller_name
  item.quantity = quantity ?? item.quantity
  item.prod_size = prod_size ?? item.prod_size
  item.avalaible_location = avalaible_location ?? item.avalaible_location

  const updated = await item.save()
  res.json(updated)
})
