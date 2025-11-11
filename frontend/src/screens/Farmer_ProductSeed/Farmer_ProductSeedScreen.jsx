import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Alert } from 'react-bootstrap';
import PurchaseSeeds from '../../components/PurchaseSeeds/PurchaseSeeds';
import './Farmer_ProductSeedStyles.css';

import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';

import { listSeedProducts } from './../../actions/productSeedActions';
import Meta from '../../components/Helmet/Meta';

const Farmer_ProductSeedScreen = () => {
    const dispatch = useDispatch();

    // ✅ Fixed variable name
    const productSeedList = useSelector(state => state.productSeedList);
    const { loading, error, productSeeds = [] } = productSeedList;

    const [numberOfItems, setNumberOfItems] = useState(3);

    useEffect(() => {
        dispatch(listSeedProducts());
    }, [dispatch]);

    const showMore = () => {
        if (numberOfItems + 3 <= productSeeds.length) {
            setNumberOfItems(numberOfItems + 3);
        } else {
            setNumberOfItems(productSeeds.length);
        }
    };

    return (
        <div className="ProductSeedScreen">
            <Meta title="Agri-Connect | Farmer Seeds" />
            <Container>
                <h1 className="p-3 text-center">Latest Seeds</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Row>
                        {productSeeds
                            .slice(0, numberOfItems)
                            .map(seed => (
                                <PurchaseSeeds
                                    key={seed._id}
                                    _id={seed._id}
                                    name={seed.name}
                                    image={seed.image}
                                    rating={seed.rating}
                                    reviews={seed.numReviews}
                                    price={seed.price}
                                />
                            ))}
                        {numberOfItems >= productSeeds.length ? (
                            <Alert variant="danger" className="col-md-12 text-center">
                                Finished
                            </Alert>
                        ) : null}
                        <Button
                            className="col-md-12 text-center"
                            variant="success outline-dark"
                            onClick={showMore}
                        >
                            Show more
                        </Button>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default Farmer_ProductSeedScreen;
