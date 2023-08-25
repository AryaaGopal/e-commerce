import { useContext, useState } from 'react';
import React from 'react';
import faker from 'faker';
import SingleProduct from './SingleProduct';




faker.seed(100)
const Home = () => {

 
   
    
  const productArray = [...Array(21)].map(() => 
  ({
    id:faker.datatype.uuid(),
    name:faker.commerce.productName(),
    price:faker.commerce.price(),
    image:faker.random.image()
  }));

  const [products]=useState(productArray)

  return (
    <div className='productContainer'>
    {products.map((product) => (
      
      <SingleProduct key={product.id} prod={product}/>
    ))}
  </div>
  )
  
}

export default Home;
