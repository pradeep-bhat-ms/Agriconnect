import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import ProductLendMachines from '../models/productLendMachineModel.js'

// GET /api/lendMachines
export const getLendMachines = asyncHandler(async (_req, res) => {
  const machines = await ProductLendMachines.find({})
  res.json(machines)
})

// GET /api/lendMachines/:id
export const getLendMachineById = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid machine id' })
  }

  const machine = await ProductLendMachines.findById(id)
  if (!machine) return res.status(404).json({ message: 'Machine not found' })
  res.json(machine)
})

// DELETE /api/lendMachines/:id
export const deleteLendMachine = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid machine id' })
  }

  const machine = await ProductLendMachines.findById(id)
  if (!machine) return res.status(404).json({ message: 'Machine not found' })

  await machine.deleteOne()
  res.json({ message: 'Machine removed' })
})

// POST /api/lendMachines
export const createLendMachine = asyncHandler(async (req, res) => {
  const machine = new ProductLendMachines({
    name: 'Sample Machine',
    user: req.user?._id,
    image: '/images/farmMachine.jpg',
    description: 'Sample description',
    target_plant: 'Sample plant',
    price: 0,
    quantity: 0,
    machine_power: '0HP',
  })
  const created = await machine.save()
  res.status(201).json(created)
})

// PUT /api/lendMachines/:id
export const updateLendMachine = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid machine id' })
  }

  const machine = await ProductLendMachines.findById(id)
  if (!machine) return res.status(404).json({ message: 'Machine not found' })

  const { name, price, image, description, target_plant, quantity, machine_power } = req.body
  machine.name = name ?? machine.name
  machine.price = price ?? machine.price
  machine.image = image ?? machine.image
  machine.description = description ?? machine.description
  machine.target_plant = target_plant ?? machine.target_plant
  machine.quantity = quantity ?? machine.quantity
  machine.machine_power = machine_power ?? machine.machine_power

  const updated = await machine.save()
  res.json(updated)
})
