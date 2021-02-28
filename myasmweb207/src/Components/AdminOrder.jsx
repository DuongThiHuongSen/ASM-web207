
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
    const [clickRow, setClickRow] = useState(-1);
    const [product, setproducts] = useState(initValue);
    const [formData, setformData] = useState({
    id: "",
    pro_id: '',
    total: '',
    date: '',
  });
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
            {/* <CreateOrder 
                clickRow={clickRow} 
                formData={formData} 
                setformData={setformData}
                setClickRow ={setClickRow}
                order = {order}
                setorder = {setorder}
            /> */}
            < Orders 
                orders = {order}
                setorders = {setorder}
                setformData={setformData}
                product={product}
                clickRow={clickRow} 
                setClickRow ={setClickRow}
            />
            </Container>
            {/* <Route path="/admin" component={Admin}/>
          <Route path="/" component={Home} exact={true}/> */}
            </Router>
        </div>
    );
}
export default AdminOrder;