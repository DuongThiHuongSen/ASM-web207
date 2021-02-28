// import Head from './Header/header';
import Banner from './Header/Banner';
import Category from './Body/Category';
import TopWatch from './Body/TopWatch';
import Introduce from './Body/Introduction';
import Foot from './Footer/Foot'; 
import axios from 'axios';
import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductByCate from './ProductByCate';
function Home(params) {
  const initValue = [];
  const [productnam, setproductsNam] = useState(initValue);
  const [productnu, setproductsNu] = useState(initValue);
  const [cateView, setcateView] = useState(-1);
  const [cates, setcates] = useState(initValue);
  const [cart, setcart] = useState(initValue);
  const [formData, setformData] = useState({
      id: '',
      amount : '',
    });

  useEffect(() => {
      const urlNam = "http://localhost:3040/product?cate_id_like=1&status=true";
      const urlNu = "http://localhost:3040/product?cate_id_like=2&status=true";
      async function getProductNam(url) {
        const {data} = await axios.get(url);
        setproductsNam(data);
      }
      async function getProductNu(url) {
        const {data} = await axios.get(url);
        setproductsNu(data);
      }
      async function getcate() {
        const {data} = await axios.get("http://localhost:3040/category?status=true");
        setcates(data);
        console.log(data);
      }
      async function getcart() {
        const {data} = await axios.get(`http://localhost:3040/cart`);
        console.log(data);
        setcart(data);
      }

      getcate();
      getProductNam(urlNam);
      getProductNu(urlNu);
      getcart();
    }, []);

  return(
    <div class="w-full mx-auto">
      <Router>
        <Banner/>
        <Category cate={cates}
                  setcateView = {setcateView}
        />
        <Route path="/"  exact={true} >
          <TopWatch productsNam={productnam} 
                  productsNu={productnu}
                  cart= {cart}
                  formData = {formData}/>
        </Route>
        
        {cates.map((value, index)=> 
          (
            <Route path={'/category/'+value.id}  exact={true} >
              <ProductByCate 
                cart= {cart}
                cateView={cateView}
              />
            </Route>
          )
        )}

        <Introduce/>
        <Foot/>
      
      </Router>
    </div>
  );
}
export default Home;