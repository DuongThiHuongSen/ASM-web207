
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Product from './Adminstrator/Porduct_manage';
import CreateProduct from './Adminstrator/CreateProduct';
import Container from '@material-ui/core/Container';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import WatchIcon from '@material-ui/icons/Watch';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import { confirmAlert } from 'react-confirm-alert';

// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


function AdminProduct() {
    
    const initValue = [];
    const [product, setproducts] = useState(initValue);
    const [cate, setcate] = useState(initValue);
    const [clickRow, setClickRow] = useState(-1);
    const [formData, setformData] = useState({
    id: '',
    name: '',
    price: '',
    cate_id: '',
    status : true,
    quantity: '',
    image:'',
    description: '',
  });
useEffect(() => {
    async function getProduct() {
      const {data : x} = await axios.get("http://localhost:3040/product");
      setproducts(x);
    }
    // async function getProductforkey(key) {
    //   const {data } = await axios.get(`http://localhost:3040/product?name_like=${key}`);
    //   console.log("search"+search);
    //   setproducts(data);
    // }
    async function getCate() {
      const {data} = await axios.get("http://localhost:3040/category");
      setcate(data);
    }
    // getProductforkey(search);
    getProduct();
    getCate();
  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const divStyle = {
    height: '5px',
    width:'100%',
   };
    return(
        <div>
            {/* <div className="h-28"></div> */}
            <Container maxWidth="md">
            <div style={divStyle}></div>
            <CreateProduct 
                clickRow={clickRow} 
                formData={formData} 
                setformData={setformData}
                setproduct={setproducts}
                product={product}
                setClickRow ={setClickRow}
                cate = {cate}
                setcate = {setcate}
            />
            </Container>
            <Container maxWidth="lg">
            < Product 
                product={product}
                setproduct={setproducts}
                setformData={setformData} // set giá trị cho form hiển thị
                setClickRow ={setClickRow}
                clickRow={clickRow}
                cate = {cate}
                setcate = {setcate}
                
            />
            </Container>
        </div>
    );
}
export default AdminProduct;