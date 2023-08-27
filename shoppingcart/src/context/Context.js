import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import faker from 'faker';
import axios from 'axios';
import { cartReducer, productReducer } from './Reducer';

export const Cart = createContext();
faker.seed(99);

const Context = ({ children, loggedInUser }) => {
  const [user, setUser] = useState(loggedInUser);

  useEffect(() => {
    setUser(loggedInUser);
  }, [loggedInUser]);

  const userId = user ? user.Email : null;

  const savedCartData = localStorage.getItem(`cart${userId}`);
  const initialCartData = savedCartData ? JSON.parse(savedCartData) : [];

  const Products = [...Array(22)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: `https://picsum.photos/200/300?random=${faker.datatype.number()}`,
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const ProductData = async () => {
    try {
      const response = await axios.post("http://localhost:3009/Products", {
        Products: [...Array(22)].map(() => ({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: faker.commerce.price(),
          description: faker.commerce.description(),
          image: `https://picsum.photos/200/300?random=${faker.datatype.number()}`,
          inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
          fastDelivery: faker.datatype.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
        }))
      });
      console.log('prod data updated in database:', response.data);
    } catch (error) {
      console.error('Error updating prod data in database:', error);
    }
  };
  useEffect(() => {


    ProductData();
  }, [Products]);
  const [state, dispatch] = useReducer(cartReducer, {
    Products: Products,
    cart: initialCartData || [],
    userId: userId
  });

  const [productstate, productdispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: ""
    
  });

  useEffect(() => {
    localStorage.setItem(`cart${userId}`, JSON.stringify(state.cart));


    updateCartData(state.cart);
  }, [state.cart, userId]);

  const updateCartData = async (newCart) => {
    try {
      const response = await axios.post("http://localhost:3009/cart", {
        userId: userId,
        cart: newCart,
      });
      console.log('Cart data updated in database:', response.data);
    } catch (error) {
      console.error('Error updating cart data in database:', error);
    }
  };

  return (
    <Cart.Provider value={{ state, dispatch, productstate, productdispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
