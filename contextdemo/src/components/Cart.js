import React, { useState, useEffect, useContext } from 'react';
import SingleProduct from './SingleProduct';
import { Cart } from '../Context';

const CartPage = () => {
    const {cart} = useContext(Cart)
    const [total, setTotal] = useState()
  useEffect(() => {
  setTotal(cart.reduce((acc,curr)=>acc+Number(curr.price),0))
  }, [cart])
  
        return (
          <div >
            <span style={{ fontSize: 30 }}></span>
            <br />
            <span style={{ fontSize: 30 }}>Total: {total}</span>
            <div className='productContainer'>
        
             {cart.map((prod)=>(
                <SingleProduct prod={prod} key={prod.id} ></SingleProduct>
             ))}
            </div>
          </div>
        );
   
   
  
};

export default CartPage;
