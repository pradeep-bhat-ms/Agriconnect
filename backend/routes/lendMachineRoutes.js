import express from 'express'
import {
  getLendMachines,
  getLendMachineById,
  deleteLendMachine,
  createLendMachine,
  updateLendMachine,
} from '../controllers/productLendMachineController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router() // mounted at /api/lendMachines

router.route('/')
  .get(getLendMachines)
  .post(protect, admin, createLendMachine)

router.route('/:id')
  .get(getLendMachineById)
  .put(protect, admin, updateLendMachine)
  .delete(protect, admin, deleteLendMachine)

export default router
