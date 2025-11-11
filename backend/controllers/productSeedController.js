import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import ProductSeed from './../models/productSeedModel.js';

const noStore = (res) =>
  res.set({ 'Cache-Control': 'no-store', 'Pragma': 'no-cache', 'Expires': '0' });

// @desc    Fetch all seeds
// @route   GET /api/seeds
// @access  Public
const getSeedProducts = asyncHandler(async (req, res) => {
  const productSeed = await ProductSeed.find({});
  noStore(res);
  return res.status(200).json(productSeed);
});

// @desc    Fetch seed by id
// @route   GET /api/seeds/:id
// @access  Public
const getSeedProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    noStore(res);
    return res.status(400).json({ message: 'Invalid seed id' });
  }

  const productSeed = await ProductSeed.findById(id);
  if (!productSeed) {
    noStore(res);
    return res.status(404).json({ message: 'Seed not found' });
  }

  noStore(res);
  return res.status(200).json(productSeed);
});

// @desc    Delete seed
// @route   DELETE /api/seeds/:id
// @access  Private/Admin
const deleteSeedProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    noStore(res);
    return res.status(400).json({ message: 'Invalid seed id' });
  }

  const productSeed = await ProductSeed.findById(id);
  if (!productSeed) {
    noStore(res);
    return res.status(404).json({ message: 'Seed not found' });
  }

  await productSeed.deleteOne();
  noStore(res);
  return res.status(200).json({ message: 'Product removed' });
});

// @desc    Create seed
// @route   POST /api/seeds
// @access  Private/Admin
const createSeedProduct = asyncHandler(async (req, res) => {
  const productSeed = new ProductSeed({
    name: 'Sample Seed',
    user: req.user?._id, // safe if auth not wired yet
    image: '/images/sample.png',
    description: 'Sample Description',
    category: 'Sample Category',
    price: 0,
    countInStock: 0,
    numReviews: 0,
  });

  const createdProduct = await productSeed.save();
  noStore(res);
  return res.status(201).json(createdProduct);
});

// @desc    Update seed
// @route   PUT /api/seeds/:id
// @access  Private/Admin
const updateSeedProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, image, description, category, countInStock } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    noStore(res);
    return res.status(400).json({ message: 'Invalid seed id' });
  }

  const doc = await ProductSeed.findById(id);
  if (!doc) {
    noStore(res);
    return res.status(404).json({ message: 'Product not found' });
  }

  doc.name = name ?? doc.name;
  doc.price = price ?? doc.price;
  doc.image = image ?? doc.image;
  doc.description = description ?? doc.description;
  doc.category = category ?? doc.category;
  doc.countInStock = countInStock ?? doc.countInStock;

  const updated = await doc.save();
  noStore(res);
  return res.status(200).json(updated);
});

// @desc    Create seed review
// @route   POST /api/seeds/:id/reviews
// @access  Private
const createSeedProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    noStore(res);
    return res.status(400).json({ message: 'Invalid seed id' });
  }

  const productSeed = await ProductSeed.findById(id);
  if (!productSeed) {
    noStore(res);
    return res.status(404).json({ message: 'Product not found' });
  }

  // one-per-user if auth exists
  if (req.user?._id) {
    const already = productSeed.reviews?.find(
      (r) => r.user?.toString?.() === req.user._id.toString()
    );
    if (already) {
      noStore(res);
      return res.status(400).json({ message: 'Product already reviewed' });
    }
  }

  const review = {
    name: req.user?.name || 'Anonymous User',
    rating: Number(rating) || 0,
    comment: comment || '',
    user: req.user?._id,
    createdAt: new Date(),
  };

  if (!Array.isArray(productSeed.reviews)) productSeed.reviews = [];
  productSeed.reviews.push(review);
  productSeed.numReviews = productSeed.reviews.length;
  productSeed.rating =
    productSeed.reviews.reduce((acc, item) => item.rating + acc, 0) /
    productSeed.reviews.length;

  await productSeed.save();
  noStore(res);
  return res.status(201).json({ message: 'Review added', review });
});

export {
  getSeedProducts,
  getSeedProductById,
  deleteSeedProduct,
  createSeedProduct,
  updateSeedProduct,
  createSeedProductReview,
};
