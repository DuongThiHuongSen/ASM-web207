
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router } from "react-router-dom";
import Cart_manage from './Cart_manage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';

const propTypes = {
    cart : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            amount : PropTypes.number.isRequired
        })
    ).isRequired, // cart nhan vao phai la array .isRequied la yeu cau phai co
    setcart : PropTypes.func.isRequired,
};


function Cart({cart, setcart}) {
    
    const initValue = [];
    const [order, setorder] = useState(initValue);
    const [product, setproducts] = useState(initValue);

useEffect(() => {

    // async function getcart() {
    //   const {data} = await axios.get(`http://localhost:3040/cart`);
    //   console.log(data);
    //   setcart(data);
      
    // }
    async function getProduct() {
        const {data : x} = await axios.get("http://localhost:3040/product");
        setproducts(x);
        console.log("product -----");
        console.log(x);
      }

    async function getorder() {
        const {data} = await axios.get(`http://localhost:3040/order`);
        setorder(data);
      }
    // getProductforkey(search);
    getProduct();
    getorder();
  }, []);

  
  const divStyle = {
    height: '5px',
    width:'100%',
   };
    return(
        <div>
            <Router>
            <div className="h-28"></div>
            <Container maxWidth="md">
                <ShoppingCartIcon style={{ fontSize: 100 }} color="secondary"/>
                
                <div style={divStyle}></div>
                <Cart_manage 
                    cart ={cart}
                    setcart = {setcart}
                    product={product}
                    order = {order}
                    setorder = {setorder}
                />
            </Container>
            {/* <Route path="/admin" component={Admin}/>
          <Route path="/" component={Home} exact={true}/> */}
            </Router>
        </div>
    );
}
export default Cart;
Cart.propTypes = propTypes;