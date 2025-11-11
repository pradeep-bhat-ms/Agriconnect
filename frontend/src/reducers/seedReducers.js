// seedReducers.js
import {
  SEED_LIST_REQUEST,
  SEED_LIST_SUCCESS,
  SEED_LIST_FAIL,
  SEED_DELETE_REQUEST,
  SEED_DELETE_SUCCESS,
  SEED_DELETE_FAIL,
  SEED_CREATE_REQUEST,
  SEED_CREATE_SUCCESS,
  SEED_CREATE_FAIL,
  SEED_CREATE_RESET,
} from '../constants/productConstants'

// ✅ reducer for listing seeds
export const productSeedListReducer = (state = { productSeeds: [] }, action) => {
  switch (action.type) {
    case SEED_LIST_REQUEST:
      return { loading: true, productSeeds: [] }
    case SEED_LIST_SUCCESS:
      return { loading: false, productSeeds: action.payload }
    case SEED_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// ✅ reducer for deleting seeds
export const productSeedDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SEED_DELETE_REQUEST:
      return { loading: true }
    case SEED_DELETE_SUCCESS:
      return { loading: false, success: true }
    case SEED_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// ✅ reducer for creating seeds
export const seedCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SEED_CREATE_REQUEST:
      return { loading: true }
    case SEED_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case SEED_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case SEED_CREATE_RESET:
      return {}
    default:
      return state
  }
}
