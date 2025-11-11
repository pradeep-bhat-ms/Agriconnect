import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import Message from '../../../Message/Message'
import Loader from '../../../Loader/Loader'
import FormContainer from '../../../FormContainer/FormContainer'
import Meta from '../../../Helmet/Meta'

// ✅ use your actual folders and action names
import {
  listSeedProducts,
  deleteSeedProducts,   // renamed to match your actions file
  createSeedProducts,  // renamed to match your actions file
} from '../../../../actions/productSeedActions'
import { SEED_CREATE_RESET } from '../../../../constants/productConstants'

const SeedList = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  // Your list reducer state uses { productSeeds: [] }
  const seedList = useSelector((state) => state.productSeedList || {})
  const { loading = false, error = null, productSeed = [] } = seedList

  // Delete slice name matches your store: productSeedDelete
  const seedDelete = useSelector((state) => state.productSeedDelete || {})
  const {
    loading: loadingDelete = false,
    error: errorDelete = null,
    success: successDelete = false,
  } = seedDelete

  // Create slice name in your store: seedCreate
  const seedCreate = useSelector((state) => state.seedCreate || {})
  const {
    loading: loadingCreate = false,
    error: errorCreate = null,
    success: successCreate = false,
    product: createdProduct,
  } = seedCreate

  useEffect(() => {
    if (successCreate && createdProduct?._id) {
      dispatch({ type: SEED_CREATE_RESET })
      history.push(`/admin/productlist/seed/${createdProduct._id}/edit`)
    } else {
      dispatch(listSeedProducts())
    }
  }, [dispatch, history, successCreate, createdProduct, successDelete])

  const createProductHandler = () => {
    dispatch(createSeedProducts())
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteSeedProducts(id))
    }
  }

  return (
    <>
      <Meta title="Seeds | Admin" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="m-0">Seeds</h1>
        <button className="btn btn-primary" onClick={createProductHandler}>
          <i className="fas fa-plus" /> Create Seed
        </button>
      </div>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <div className="table-responsive">
            <table className="table table-sm table-striped align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>CAT</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productSeed.map((p) => (
                  <tr key={p._id}>
                    <td>{p._id}</td>
                    <td>{p.name}</td>
                    <td>₹{p.price}</td>
                    <td>{p.countInStock}</td>
                    <td>{p.category}</td>
                    <td className="text-nowrap">
                      <Link
                        to={`/admin/productlist/seed/${p._id}/edit`}
                        className="btn btn-light btn-sm"
                        title="Edit"
                      >
                        <i className="fas fa-edit" />
                      </Link>{' '}
                      <button
                        onClick={() => deleteHandler(p._id)}
                        className="btn btn-danger btn-sm"
                        title="Delete"
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FormContainer>
      )}
    </>
  )
}

export default SeedList
