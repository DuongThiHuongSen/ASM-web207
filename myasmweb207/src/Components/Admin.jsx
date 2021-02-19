
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Product from './Adminstrator/Porduct_manage';
import CreateProduct from './Adminstrator/CreateProduct';
import Container from '@material-ui/core/Container';
// import { confirmAlert } from 'react-confirm-alert';

// import Swal from 'sweetalert2/dist/sweetalert2.js';
// import 'sweetalert2/src/sweetalert2.scss'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


function Admin() {
    const initValue = [];
    const [product, setproducts] = useState(initValue);
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
          const {data} = await axios.get("http://localhost:3040/product");
          console.log(data);
          setproducts(data);
        }
        getProduct();
      }, []);
    
    return(
        <div>
            <div className="h-28"></div>
            <Container maxWidth="md">
            <h1>Đây là trang quản trị viên</h1>
            <h2>Sản phẩm : </h2>
            <CreateProduct 
                clickRow={clickRow} 
                formData={formData} 
                setformData={setformData}
                setproduct={setproducts}
                product={product}
                setClickRow ={setClickRow}
            />
            </Container>
            < Product 
                product={product}
                setproduct={setproducts}
                setformData={setformData} // set giá trị cho form hiển thị
                setClickRow ={setClickRow}
                clickRow={clickRow}
            />
        </div>
    );
}
export default Admin;