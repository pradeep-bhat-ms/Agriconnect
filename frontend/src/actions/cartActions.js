import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESSS,
  CART_SAVE_PAYMENT_METHOD,
} from './../constants/cartConstants'

// Add to cart: works with either full product object or just id
export const addToCart = (productOrId, qty) => async (dispatch, getState) => {
  let item = null

  // ✅ Case 1: already have full product object
  if (typeof productOrId === 'object' && productOrId._id) {
    item = {
      seed: productOrId._id,
      name: productOrId.name,
      image: productOrId.image,
      price: productOrId.price,
      countInStock: productOrId.countInStock || productOrId.quantity,
      qty,
    }
  } else {
    const id = productOrId
    // ✅ Case 2: fetch by id
    try {
      const { data } = await axios.get(`/api/seeds/${id}`)
      item = {
        seed: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      }
    } catch (error) {
      try {
        const { data } = await axios.get(`/api/lendMachines/${id}`)
        item = {
          seed: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.quantity,
          qty,
        }
      } catch (error2) {
        const { data } = await axios.get(`/api/consumer/${id}`)
        item = {
          seed: data._id,
          name: data.prod_name,
          image: data.image,
          price: data.price,
          countInStock: data.quantity,
          qty,
        }
      }
    }
  }

  if (item) {
    dispatch({
      type: CART_ADD_ITEM,
      payload: item,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cartSeed.cartItems))
  }
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cartSeed.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESSS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
