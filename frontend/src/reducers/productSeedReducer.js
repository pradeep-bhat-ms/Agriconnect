// frontend/src/reducers/productSeedReducer.js
import {
  // LIST
  PRODUCT_SEED_LIST_REQUEST,
  PRODUCT_SEED_LIST_SUCCESS,
  PRODUCT_SEED_LIST_FAIL,

  // DETAILS
  PRODUCT_SEED_DETAILS_REQUEST,
  PRODUCT_SEED_DETAILS_SUCCESS,
  PRODUCT_SEED_DETAILS_FAIL,

  // DELETE
  SEED_DELETE_REQUEST,
  SEED_DELETE_SUCCESS,
  SEED_DELETE_FAIL,

  // CREATE
  SEED_CREATE_REQUEST,
  SEED_CREATE_SUCCESS,
  SEED_CREATE_FAIL,
  SEED_CREATE_RESET,

  // UPDATE
  SEED_UPDATE_REQUEST,
  SEED_UPDATE_SUCCESS,
  SEED_UPDATE_FAIL,
  SEED_UPDATE_RESET,

  // REVIEW
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants';

// ---------- LIST ----------
export const productSeedListReducer = (state = { productSeeds: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEED_LIST_REQUEST:
      return { loading: true, productSeeds: [] };
    case PRODUCT_SEED_LIST_SUCCESS:
      return { loading: false, productSeeds: action.payload };
    case PRODUCT_SEED_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ---------- DETAILS ----------
const detailsInitial = { loading: false, error: null, product: { reviews: [] } };

export const productSeedDetailsReducer = (state = detailsInitial, action) => {
  switch (action.type) {
    case PRODUCT_SEED_DETAILS_REQUEST:
      return { ...state, loading: true, error: null }; // clear stale error
    case PRODUCT_SEED_DETAILS_SUCCESS:
      return { loading: false, error: null, product: action.payload };
    case PRODUCT_SEED_DETAILS_FAIL:
      return { loading: false, error: action.payload, product: {} };
    default:
      return state;
  }
};

// ---------- DELETE ----------
export const productSeedDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SEED_DELETE_REQUEST:
      return { loading: true };
    case SEED_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SEED_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ---------- CREATE ----------
export const seedCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SEED_CREATE_REQUEST:
      return { loading: true };
    case SEED_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case SEED_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SEED_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// ---------- UPDATE ----------
export const seedUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case SEED_UPDATE_REQUEST:
      return { loading: true };
    case SEED_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case SEED_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SEED_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

// ---------- REVIEW CREATE ----------
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
