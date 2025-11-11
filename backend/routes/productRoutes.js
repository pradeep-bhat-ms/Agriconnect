// routes/productRoutes.js
import express from 'express';
import { protect, admin } from './../middleware/authMiddleware.js';

import {
  getSeedProducts,
  getSeedProductById,
  deleteSeedProduct,
  createSeedProduct,
  updateSeedProduct,
  createSeedProductReview,
} from './../controllers/productSeedController.js';

import {
  getLendMachines,
  getLendMachineById,
  deleteLendMachine,
  updateLendMachine,
  createLendMachine,
} from './../controllers/productLendMachineController.js';

import {
  getConsumerProducts,
  getConsumerProductById,
  deleteConsumerProduct,
  createConsumer,
  updateConsumer,
} from './../controllers/consumerProductController.js';

const router = express.Router();

// Seeds
router.route('/seeds').get(getSeedProducts).post(protect, admin, createSeedProduct);
router.route('/seeds/:id/reviews').post(protect, createSeedProductReview);
router
  .route('/seeds/:id')
  .get(getSeedProductById)
  .delete(protect, admin, deleteSeedProduct)
  .put(protect, admin, updateSeedProduct);

// Lend Machines
router.route('/lendMachines').get(getLendMachines).post(protect, admin, createLendMachine);
router
  .route('/lendMachines/:id')
  .get(getLendMachineById)
  .delete(protect, admin, deleteLendMachine)
  .put(protect, admin, updateLendMachine);

// Consumer
router.route('/consumer').get(getConsumerProducts).post(protect, admin, createConsumer);
router
  .route('/consumer/:id')
  .get(getConsumerProductById)
  .delete(protect, admin, deleteConsumerProduct)
  .put(protect, admin, updateConsumer);

export default router;
