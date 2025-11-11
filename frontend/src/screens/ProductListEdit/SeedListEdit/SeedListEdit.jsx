import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'

import Message from '../../../components/Message/Message'
import Loader from '../../../components/Loader/Loader'
import FormContainer from '../../../components/FormContainer/FormContainer'
import Meta from '../../../components/Helmet/Meta'

import {
  listSeedProductsDetails, // your action name
  updateSeedProducts,      // your action name
} from '../../../actions/productSeedActions'
import { SEED_UPDATE_RESET } from '../../../constants/productConstants'

const SeedListEdit = () => {
  const { id: productId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  // 🔐 require admin
  const { userInfo } = useSelector((state) => state.userLogin || {})
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) history.push('/login')
  }, [history, userInfo])

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  // details slice: productSeedDetails
  const {
    loading = false,
    error = null,
    product = {},
  } = useSelector((state) => state.productSeedDetails || {})

  // update slice: seedUpdate
  const {
    loading: loadingUpdate = false,
    error: errorUpdate = null,
    success: successUpdate = false,
  } = useSelector((state) => state.seedUpdate || {})

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SEED_UPDATE_RESET })
      history.push('/admin/productlist')
      return
    }

    if (!product._id || product._id !== productId) {
      dispatch(listSeedProductsDetails(productId))
    } else {
      setName(product.name || '')
      setPrice(product.price || 0)
      setImage(product.image || '')
      setCategory(product.category || '')
      setCountInStock(product.countInStock || 0)
      setDescription(product.description || '')
    }
  }, [dispatch, history, productId, product, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateSeedProducts({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
      })
    )
  }

  return (
    <>
      <Meta title="Edit Seed | Admin" />
      <Link to="/admin/seeds" className="btn btn-light btn-sm">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Seed</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-group my-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                className="form-control"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="number"
                className="form-control"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
            </div>

            <div className="form-group my-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  )
}

export default SeedListEdit
