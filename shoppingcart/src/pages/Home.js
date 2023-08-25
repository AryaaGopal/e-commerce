import React from 'react';
import { CartState } from '../context/Context';
import SingleProduct from './SingleProduct';
import '../style/style.css';
import Filters from './Filters';
import Header from './Header';

const Home = ({ loggedInUser }) => {
  const {
    state: { Products },
    productstate: { byStock, byFastDelivery, byRating, sort, searchQuery },
  } = CartState();

  console.log(Products);

  const transformProducts = () => {
    let sortedProducts = [...Products];
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.inStock
      )

    }
    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.fastDelivery
      )

    }
    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.ratings >= byRating
      )

    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      )

    }

    return sortedProducts;
  }
  return (
    <div>
      <Header loggedInUser={loggedInUser} />
      <div className='home'>
        <Filters />
        <div className='productContainer'>
          {
            transformProducts().map((prod) => (
              <SingleProduct prod={prod} key={prod.id} loggedInUser={loggedInUser} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
