// import logo from './logo.svg';
import './App.css';
import react,{useEffect} from 'react';
import Head from './Components/Header/header';
import Banner from './Components/Header/Banner';
import Category from './Components/Body/Category';
import TopWatch from './Components/Body/TopWatch';
import Introduce from './Components/Body/Introduction'; 
import Foot from './Components/Footer/Foot';
import Home from './Components/Home';
import Admin from './Components/Admin';

// axios
import axios from 'axios';
// sử dụng router
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    async function getProduct() {
      const {data} = await axios.get("http://localhost:3040/product");
      console.log(data);
    }
    getProduct();
  }, [])
  
  return (
    <Router>
    <div>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={Home} exact={true}/>
      
  </div>
  </Router>
  );
}

export default App;