import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import Message from '../../Message/Message';
import Loader from '../../Loader/Loader';
import { listSupplierProducts } from '../../../actions/supplierProduct';
import MapStyles from './MapStyles';
import Rating from './Rating/Rating';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 12.9716,
  lng: 77.5946
};

const MapComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedPlace, setSelectedPlace] = useState(null);

  const supplierProductList = useSelector(state => state.supplierProductList);
  const { loading: loadingProducts, error: errorProducts, products } = supplierProductList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo?.isAdmin && !userInfo) {
      history.push('/login');
    } else {
      dispatch(listSupplierProducts());
    }
  }, [dispatch, history, userInfo]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{ styles: MapStyles }}
    >
      {loadingProducts ? (
        <Loader />
      ) : errorProducts ? (
        <Message variant='danger'>{errorProducts}</Message>
      ) : (
        products.map(place => (
          <Marker
            key={place._id}
            position={{
              lat: place.latitude,
              lng: place.longitude
            }}
            onClick={() => setSelectedPlace(place)}
            icon={{
              url: '/mapIcon.svg',
              scaledSize: new window.google.maps.Size(25, 25)
            }}
          />
        ))
      )}

      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.latitude,
            lng: selectedPlace.longitude
          }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <Image className="mx-auto d-block img-fluid mb-1" rounded width="120px" src={selectedPlace.image} alt={selectedPlace.name} />
            <h4 style={{ textAlign: "center" }}>{selectedPlace.cropSelection}</h4>
            <p>
              Farmer: <strong>{selectedPlace.name}</strong><br />
              Description: {selectedPlace.description}<br />
              Address: {selectedPlace.address}<br />
              Reviewed: {
                selectedPlace.isReviwed ? (
                  <>
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                    <p><Rating text="Rating" value={selectedPlace.rating} /></p>
                  </>
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }} />
                )
              }
            </p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
