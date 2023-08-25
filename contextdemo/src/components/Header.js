import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Import the CSS file for custom styles
import { Cart } from '../Context';


const Header = () => {
    const {cart} = useContext(Cart)
  return (
    <div className='header-container'>
      <span className='header-text'>React Context API</span>
      <ul className='nav'>
        <li className='nav-item'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-item'>
          <Link to='/cart'>Cart:{cart.length}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
