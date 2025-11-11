// routes/consumerRoutes.js
import express from 'express';
import { protect, admin } from './../middleware/authMiddleware.js';
import {
  getConsumerProducts,
  getConsumerProductById,
  createConsumer,
  updateConsumer,
  deleteConsumerProduct
} from './../controllers/consumerProductController.js';

const router = express.Router();

router.route('/')
  .get(getConsumerProducts)
  .post(protect, admin, createConsumer);

router.route('/:id')
  .get(getConsumerProductById)
  .put(protect, admin, updateConsumer)
  .delete(protect, admin, deleteConsumerProduct);

export default router;
