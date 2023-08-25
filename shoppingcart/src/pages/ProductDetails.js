import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartState } from '../context/Context';
import { Rating } from '@mui/material';
import { Button, Navbar } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge, Container, Dropdown, FormControl, Nav } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';


const ProductDetails = ({ userdata }) => {
    console.log(userdata)
    const { productId } = useParams();
    console.log("product id", productId)
    const {
        state: { Products, cart },
        dispatch,
    } = CartState();

    const selectedProduct = Products.find(product => product.id === productId);
    const handleAddToCart = () => {

        const isProductInCart = cart.some((p) => p.id === selectedProduct.id);
        if (!isProductInCart) {
            dispatch({
                type: 'ADD_TO_CART',
                payload: selectedProduct,
            });
        }
    };
    const handleRemoveFromCart = () => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: selectedProduct,
        });
    };
    return (
        <div>
            <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
                <Navbar.Brand>
                    <Link to="/home"><h5 style={{ marginLeft: '400px' }}>Shopping cart!Your Gateway to Seamless Shopping</h5></Link>
                </Navbar.Brand>

                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="success">
                            <FaShoppingCart color="white" fontSize="25px" ></FaShoppingCart>
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {cart.length > 0 ? (
                                <div>
                                    {cart.map((prod) => (
                                        <span className="cartitem" key={prod.id}>
                                            <img
                                                src={prod.image}
                                                className="cartItemImg"
                                                alt={prod.name}
                                            />
                                            <div className="cartItemDetail">
                                                <span>{prod.name}</span>
                                                <span>₹ {prod.price.split(".")[0]}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: { ...prod, },
                                                    })
                                                }
                                            />
                                        </span>
                                    ))}
                                    <Link to="/cart">
                                        <Button style={{ width: "95%", margin: "0 10px" }}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <span style={{ padding: 10 }}>Cart is Empty!</span>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>

            </Navbar>
            <div style={{ width: '500px', height: '500px', marginLeft: '30%' }}>


                {!selectedProduct &&
                    <div>Loading...</div>
                }
                <div className='ui placeholder segment'>
                    <div className='ui two column stackable center aligned grid'>
                        <div className='ui vertical divider'></div>
                        <div className='middle aligned row'>
                            <div className='column lp'>
                                <img
                                    className='ui fluid image'
                                    src={selectedProduct.image}
                                    alt={selectedProduct.title}
                                />
                            </div>
                            <div className='column rp'>
                                <h1>{selectedProduct.title}</h1>
                                <h2>
                                    <a className='ui teal tag label'>{selectedProduct.price}</a>
                                </h2>
                                <h4> {selectedProduct.fastDelivery ? <div><h5>Fast Delivery</h5></div> : <div><h4>4 days delivery</h4></div>}</h4>
                                <p><h2>{selectedProduct.name}</h2></p>
                                <p>{selectedProduct.description}</p>

                                <Rating rating={selectedProduct.ratings} />

                                <div className='visible content'>  {cart.some((p) => p.id === selectedProduct.id) ? (
                                    <Button variant="danger" onClick={handleRemoveFromCart} >
                                        Remove from Cart
                                    </Button>
                                ) : (
                                    <Button onClick={handleAddToCart} disabled={!selectedProduct.inStock}>
                                        {!selectedProduct.inStock ? 'Out of Stock' : 'Add to Cart'}
                                    </Button>
                                )}
                                    <Link to="/home"><Button >Back</Button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default ProductDetails;
