import './App.css';
import Header from '../src/components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import { useState } from 'react';
import CartPage from './components/Cart';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
        
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<CartPage  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
