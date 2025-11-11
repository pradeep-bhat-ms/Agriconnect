import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../../components/Rating/Rating'
import {
    Col,
    Container,
    Row,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from 'react-bootstrap'
import './SeedProduct.css'

import { listSeedProductsDetails, createProductReview } from './../../actions/productSeedActions'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import Meta from '../../components/Helmet/Meta'
import { addToCart } from './../../actions/cartActions'

const SeedProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productSeedDetails = useSelector((state) => state.productSeedDetails || {})
    const { loading, error } = productSeedDetails

    const product =
        productSeedDetails.productSeed ||
        productSeedDetails.product ||
        (productSeedDetails._id ? productSeedDetails : null) ||
        null

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
        }

        if (!product || product._id !== match.params.id) {
            dispatch(listSeedProductsDetails(match.params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match.params.id, successProductReview, product])

    const addToCartHandler = () => {
        if (product) {
            // ✅ Pass full product object (avoids duplicate fetch)
            dispatch(addToCart(product, Number(qty)))
            history.push('/cart')
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        )
    }

    return (
        <div className="productScreen">
            <Meta title="AgriConnect| Seed" />
            <Container>
                <Link className="btn btn-go-back btn-dark" to="/farmers/purchaseSeeds">
                    GO BACK
                </Link>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : !product ? (
                    <Message variant="danger">Product not found</Message>
                ) : (
                    <Row className="p-3 seed-product">
                        <Col md={6}>
                            <Image
                                className="mx-auto image-seed"
                                src={product.image}
                                alt={product.name}
                                width={350}
                            />
                        </Col>
                        <Col md={3}>
                            <ListGroup className="borderless" variant="flush">
                                <ListGroup.Item>
                                    <h2>{product.name}</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews || 0} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h4>Price: ₹{product.price}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <p>
                                        <strong>Description:</strong>
                                        <br />
                                        {product.description}
                                    </p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>₹{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(Number(e.target.value))}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            type="button"
                                            className="btn btn-block"
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )}
                {/* Reviews Section */}
                <Row>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        {!product?.reviews || product.reviews.length === 0 ? (
                            <Message>No Reviews</Message>
                        ) : (
                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                    <Col md={6}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                {successProductReview && (
                                    <Message variant="success">Review submitted successfully</Message>
                                )}
                                {loadingProductReview && <Loader />}
                                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="3"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button
                                            disabled={loadingProductReview}
                                            type="submit"
                                            variant="primary"
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                ) : (
                                    <p>
                                        Please <Link to="/login">sign in</Link> to write a review.
                                    </p>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            <br />
            <br />
        </div>
    )
}

export default SeedProductScreen
