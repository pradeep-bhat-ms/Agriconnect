// controllers/supplierController.js
import asyncHandler from 'express-async-handler';
import Supplier from './../models/supplierModel.js';
import nodeGeocoder from 'node-geocoder';

// @desc    Create supplier product
// @route   POST /api/supplier
// @access  Private
const createSupplierProduct = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    address,
    cropSelection,
    storage,
    image,
    phonenumber,
    description,
  } = req.body;

  if (!name || !address) {
    res.status(400);
    throw new Error('Name and address are required');
  }

  const geoCoder = nodeGeocoder({ provider: 'openstreetmap' });
  let longitude, latitude;

  try {
    const results = await geoCoder.geocode(address);
    if (results && results.length > 0) {
      longitude = results[0].longitude;
      latitude = results[0].latitude;
    }
  } catch (err) {
    // non-fatal; keep lon/lat undefined
    console.error(err);
  }

  const supplier = await Supplier.create({
    user: req.user._id,
    name,
    email,
    address,
    cropSelection,
    storage,
    longitude,
    latitude,
    image,
    phonenumber,
    description,
  });

  res.status(201).json(supplier);
});

// @desc    Get logged in user products
// @route   GET /api/supplier/myproducts
// @access  Private
const getMyProducts = asyncHandler(async (req, res) => {
  const products = await Supplier.find({ user: req.user._id });
  res.json(products);
});

// @desc    Get all Products (Public)
/// @route  GET /api/supplier/all
// @access Public
const getMyProductsForPublic = asyncHandler(async (req, res) => {
  const products = await Supplier.find({}).populate('user', 'id name');
  res.json(products);
});

// @desc    Get all Products (Admin)
// @route   GET /api/supplier
// @access  Private/Admin
const getProducts = asyncHandler(async (req, res) => {
  const products = await Supplier.find({}).populate('user', 'id name');
  res.json(products);
});

// @desc    Fetch product by id
// @route   GET /api/supplier/product/:id
// @access  Private
const getFarmerProductById = asyncHandler(async (req, res) => {
  const product = await Supplier.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
});

// @desc    Create Product Review
// @route   POST /api/supplier/product/:id/reviews
// @access  Private/Admin
const createFarmerProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Supplier.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.isReviwed = true;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    update product reviewed (admin flag?)
// @route   PUT /api/supplier/product/:id/reviews
// @access  Private/Admin
const updateProductReviewed = asyncHandler(async (req, res) => {
  const product = await Supplier.findById(req.params.id);

  if (product) {
    product.isAdmin = req.body.isAdmin; // if you actually store an admin flag per product
    const updatedProduct = await product.save();
    res.json({
      _id: updatedProduct._id,
      isAdmin: updatedProduct.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Product not found!!');
  }
});

// @desc    update supplier product profile
// @route   PUT /api/supplier/product/:id/edit
// @access  Private
const updateSupplierProductProfile = asyncHandler(async (req, res) => {
  const product = await Supplier.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('User not found!!');
  }

  product.name = req.body.name || product.name;
  product.email = req.body.email || product.email;
  product.address = req.body.address || product.address;
  product.storage = req.body.storage || product.storage;
  product.image = req.body.image || product.image;
  product.phonenumber = req.body.phonenumber || product.phonenumber;
  product.description = req.body.description || product.description;
  product.cropSelection = req.body.cropSelection || product.cropSelection;

  // If address changed, refresh coordinates
  if (req.body.address) {
    const geoCoder = nodeGeocoder({ provider: 'openstreetmap' });
    try {
      const results = await geoCoder.geocode(product.address);
      if (results && results.length > 0) {
        product.longitude = results[0].longitude;
        product.latitude = results[0].latitude;
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Allow manual override too
  if (typeof req.body.longitude !== 'undefined') product.longitude = req.body.longitude;
  if (typeof req.body.latitude !== 'undefined') product.latitude = req.body.latitude;

  const updatedproduct = await product.save();

  res.json({
    _id: updatedproduct._id,
    name: updatedproduct.name,
    email: updatedproduct.email,
    address: updatedproduct.address,
    storage: updatedproduct.storage,
    image: updatedproduct.image,
    phonenumber: updatedproduct.phonenumber,
    description: updatedproduct.description,
    longitude: updatedproduct.longitude,
    latitude: updatedproduct.latitude,
    cropSelection: updatedproduct.cropSelection,
  });
});

export {
  createSupplierProduct,
  getMyProducts,
  getProducts,
  getFarmerProductById,
  createFarmerProductReview,
  updateProductReviewed,
  getMyProductsForPublic,
  updateSupplierProductProfile,
};
