import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { CartState } from '../context/Context';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  if (!prod) {

    return null;
  }

  const handleAddToCart = () => {

    const isProductInCart = cart.some((p) => p.id === prod.id);
    if (!isProductInCart) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: prod,
      });
    }
  };

  const handleRemoveFromCart = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: prod,
    });
  };

  return (
    <div className="products">
      <Card>

        <Link to={`/product/${prod.id}`}>
          {prod.image && <Card.Img variant="top" src={prod.image} alt={prod.name} />}
        </Link>
        <Card.Body>

          <Card.Title>{prod.name}</Card.Title>

          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod.price.split('.')[0]}</span>
            {prod.fastDelivery ? <div>Fast Delivery</div> : <div>4 days delivery</div>}
            <Rating rating={prod.ratings} />

          </Card.Subtitle>

          {cart.some((p) => p.id === prod.id) ? (
            <Button variant="danger" onClick={handleRemoveFromCart}>
              Remove from Cart
            </Button>
          ) : (
            <Button onClick={handleAddToCart} disabled={!prod.inStock}>
              {!prod.inStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}

        </Card.Body>

      </Card>
    </div>
  );
};

export default SingleProduct;
