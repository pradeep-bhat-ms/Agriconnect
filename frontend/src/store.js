// src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  productSeedListReducer,
  productSeedDetailsReducer,
  productSeedDeleteReducer,
  seedCreateReducer,
  seedUpdateReducer,
  productReviewCreateReducer,
} from './reducers/productSeedReducer';

import {
  productLendMachinesListReducer,
  productLendMachinesDetailsReducer,
  productLendMachinesDeleteReducer,
  LendMachinesCreateReducer,
  LendMachinesUpdateReducer,
} from './reducers/productLendMachineReducer';

import { cartSeedReducer } from './reducers/cartReducers';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducer.js';

import {
  consumerProductListReducer,
  consumerProductDetailsReducer,
  consumerProductDeleteReducer,
  consumerCreateReducer,
  consumerUpdateReducer,
} from './reducers/consumerProductsReducer';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from './reducers/orderReducers';

import {
  productCreateReducer,
  supplierProdictListMyReducer, // (name kept as-is to match your reducer file)
  supplierProductListReducer,
  FarmerProductDetailsReducer,
  farmerReviewCreateReducer,
  farmerProductUpdateReducer,
  supplierProductForAllListReducer,
} from './reducers/supplierReducers';

const reducer = combineReducers({
  // ===== SEEDS =====
  productSeedList: productSeedListReducer,
  productSeedDetails: productSeedDetailsReducer,
  // 🛟 alias for legacy typo so old components using `state.prodcutSeedDetails` won't crash
  prodcutSeedDetails: productSeedDetailsReducer,
  productSeedDelete: productSeedDeleteReducer,
  seedCreate: seedCreateReducer,
  seedUpdate: seedUpdateReducer,
  productReviewCreate: productReviewCreateReducer,

  // ===== MACHINES =====
  productLendMachinesList: productLendMachinesListReducer,
  productLendMachinesDetails: productLendMachinesDetailsReducer,
  productLendMachinesDelete: productLendMachinesDeleteReducer,
  LendMachinesCreate: LendMachinesCreateReducer,
  LendMachinesUpdate: LendMachinesUpdateReducer,

  // ===== CONSUMER =====
  consumerProductList: consumerProductListReducer,
  consumerProductDetails: consumerProductDetailsReducer,
  consumerProductDelete: consumerProductDeleteReducer,
  consumerCreate: consumerCreateReducer,
  consumerUpdate: consumerUpdateReducer,

  // ===== ORDERS =====
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,

  // ===== SUPPLIERS =====
  productCreate: productCreateReducer,
  supplierProdictListMy: supplierProdictListMyReducer,
  supplierProductList: supplierProductListReducer,
  FarmerProductDetails: FarmerProductDetailsReducer,
  farmerReviewCreate: farmerReviewCreateReducer,
  farmerProductUpdate: farmerProductUpdateReducer,
  supplierProductForAllList: supplierProductForAllListReducer,

  // ===== MISC =====
  cartSeed: cartSeedReducer,

  // ===== USERS =====
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cartSeed: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
