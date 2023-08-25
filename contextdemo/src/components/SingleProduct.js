import React, { useContext } from 'react';
import './SingleProduct.css';
import image from './download.jpg';
import { Cart } from '../Context';

const SingleProduct = ({ prod }) => {
    const {cart,setCart} = useContext(Cart)
    return (<div className="products">
        <img src={image} alt={prod.name} />
        <div className="productDesc">
            <span style={{ fontWeight: 700 }}>{prod.name}</span>
            <span>₹ {prod.price.substring(0, 3)}</span>
        </div>
        {cart.includes(prod) ? (<button className="add remove" onClick={() => {
            setCart(cart.filter(c => c.id !== prod.id))
        }}>
            Remove from Cart
        </button>) : <button className="add" onClick={() => {
            setCart([...cart, prod])
        }}>
            Add to Cart
        </button>}


    </div>
    );
};

export default SingleProduct;
