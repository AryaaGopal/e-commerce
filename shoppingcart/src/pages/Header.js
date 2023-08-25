import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';

const Header = () => {
  const location = useLocation();
  const { state: { cart }, dispatch, productdispatch } = CartState();
  const isLoginPage = location.pathname.endsWith('/login');
  return (
    <div>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <Link to="/home">Shopping cart!Your Gateway to Seamless Shopping</Link>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              placeholder="search a product"
              className="-auto"
              onChange={(e) => {
                productdispatch({
                  type: 'FILTER_BY_SEARCH',
                  payload: e.target.value
                })
              }}
            />
          </Navbar.Text>
          <Nav>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px"></FaShoppingCart>
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
        </Container>
        {!isLoginPage && <Link to="/login"><Button>Logout</Button></Link>}
      </Navbar>
    </div>
  );
};
export default Header;
