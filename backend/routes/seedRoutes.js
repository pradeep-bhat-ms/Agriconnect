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

const router = express.Router();

router.route('/').get(getSeedProducts).post(protect, admin, createSeedProduct);
router.route('/:id/reviews').post(protect, createSeedProductReview);
router
  .route('/:id')
  .get(getSeedProductById)
  .delete(protect, admin, deleteSeedProduct)
  .put(protect, admin, updateSeedProduct);

export default router;
