
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Cates from './Adminstrator/Cate_manage';
import CreateCate from './Adminstrator/CreateCate';
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


function AdminCate() {
    
    const initValue = [];
    const [cate, setcate] = useState(initValue);
    const [product, setproduct] = useState(initValue);
    const [clickRow, setClickRow] = useState(-1);
    const [formData, setformData] = useState({
    id: '',
    category_name: '',
    status : true,
    image: '',
  });
useEffect(() => {

    async function getCate() {
      const {data} = await axios.get(`http://localhost:3040/category`);
      setcate(data);
    }

    async function getProduct() {
      const {data : x} = await axios.get("http://localhost:3040/product");
      setproduct(x);
    }
    // getProductforkey(search);
    getCate();
    getProduct();
  }, []);

  const divStyle = {
    height: '5px',
    width:'100%',
   };
    return(
        <div>
            <Router>
            {/* <div className="h-28"></div> */}
            <Container maxWidth="md">
            <div style={divStyle}></div>
            <CreateCate 
                clickRow={clickRow} 
                formData={formData} 
                setformData={setformData}
                setClickRow ={setClickRow}
                cate = {cate}
                setcate = {setcate}
            />
            < Cates 
                setformData={setformData} // set giá trị cho form hiển thị
                setClickRow ={setClickRow}
                clickRow={clickRow}
                cate = {cate}
                setcate = {setcate}
                product = {product}
            />
            </Container>
            {/* <Route path="/admin" component={Admin}/>
          <Route path="/" component={Home} exact={true}/> */}
            </Router>
        </div>
    );
}
export default AdminCate;