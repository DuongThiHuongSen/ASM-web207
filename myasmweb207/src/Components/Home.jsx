// import Head from './Header/header';
import Banner from './Header/Banner';
import Category from './Body/Category';
import TopWatch from './Body/TopWatch';
import Introduce from './Body/Introduction';
import Foot from './Footer/Foot'; 
import axios from 'axios';
import {useState, useEffect} from 'react';
function Home(params) {
  const initValue = [];
  const [productnam, setproductsNam] = useState(initValue);
  const [productnu, setproductsNu] = useState(initValue);
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
      
      // getProductforkey(search);
      getcart();
    }, []);

  return(
      <div class="w-full mx-auto">
      <Banner/>
      <Category cate={cates}/>
      <TopWatch productsNam={productnam} 
                productsNu={productnu}
                cart= {cart}
                formData = {formData}/>
      <Introduce/>
      <Foot/>
    </div>
  );
}
export default Home;