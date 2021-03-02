
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Orders from './Adminstrator/Order_manage';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router } from "react-router-dom";


// import { confirmAlert } from 'react-confirm-alert';

// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


function AdminOrder() {
    
    const initValue = [];
    const [order, setorder] = useState(initValue);
    const [product, setproducts] = useState(initValue);

useEffect(() => {

    async function getorder() {
      const {data} = await axios.get(`http://localhost:3040/order`);
      setorder(data);
    }
    async function getProduct() {
      const {data : x} = await axios.get("http://localhost:3040/product");
      setproducts(x);
      console.log("product -----");
      console.log(x);
    }
    // getProductforkey(search);
    getorder();
    getProduct();
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
            <div style={divStyle}></div>
            < Orders 
                orders = {order}
                product={product}
            />
            </Container>
            </Router>
        </div>
    );
}
export default AdminOrder;