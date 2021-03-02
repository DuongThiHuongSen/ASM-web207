// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Head from './Components/Header/header';
import Home from './Components/Home';
import Admin from './Components/Admin';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Cart from './Components/Cart/Cart';
import AllProducts from './Components/AllProducts';
// sử dụng router
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [cart, setcart] = useState([]);
  useEffect(() => {
    async function getcart() {
      const {data} = await axios.get(`http://localhost:3040/cart`);
      console.log(data);
      setcart(data);
          
    }
    getcart();
  }, [])
  
  return (
    <Router>
    <div>
      <Head cart = {cart}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/cart" >
        <Cart  
          cart={cart}
          setcart = {setcart}
        />
      </Route>
      <Route path="/products" >
         < AllProducts 
            cart={cart}
            setcart = {setcart}
          />
      </Route>
      <Route path="/" exact={true}>
          <Home 
            cart={cart}
            setcart = {setcart} 
          />
      </Route>
  </div>
  </Router>
  );
}

export default App;
