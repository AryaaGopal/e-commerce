import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Nav from './pages/Nav';
import LoginPage from './pages/LoginPage';
import Context from './context/Context';
import MyCard from './pages/Card';
import LastPage from './pages/LastPage';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';

function App({loginUser}) {

  const[totalprice,setTotalprice]=useState(null)
  const [result, setResult] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isLog = (value) => {
    console.log("val from form", value);
    setResult(value);
  }
    const handleLogin = (user) => {
      setLoggedInUser(user);
      loginUser(user)
      setUserdata(user)
  };
  const total=(value)=>{
setTotalprice(value)
  }
  console.log(totalprice)
  const[userdata,setUserdata]=useState(null)
  return (
    <Context loggedInUser={loggedInUser}>
    <BrowserRouter>
      <Nav result={result} />
      <Routes>
        <Route path="/last" element={<LastPage userdata={userdata}/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart totalammount={total}/>} />
          <Route path='/about' element={<About/>} />
          <Route path="/login" element={<LoginPage loggin={isLog} onLogin={handleLogin} />} />
          <Route path="/card" element={<MyCard price={totalprice} />} />
          <Route path='/product/:productId' element={<ProductDetails userdata={userdata}/>} />
      </Routes>
    </BrowserRouter>
    </Context>
  );
}

export default App;
