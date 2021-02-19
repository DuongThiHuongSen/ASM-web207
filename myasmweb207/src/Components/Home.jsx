import Head from './Header/header';
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
  useEffect(() => {
      const urlNam = "http://localhost:3040/product?cate_id_like=1";
      const urlNu = "http://localhost:3040/product?cate_id_like=2";
      async function getProductNam(url) {
        const {data} = await axios.get(url);
        setproductsNam(data);
      }
      async function getProductNu(url) {
        const {data} = await axios.get(url);
        setproductsNu(data);
      }
      getProductNam(urlNam);
      getProductNu(urlNu);
    }, []);

  return(
      <div class="w-full mx-auto">
      <Banner/>
      <Category/>
      <TopWatch productsNam={productnam} 
                productsNu={productnu}/>
      <Introduce/>
      <Foot/>
    </div>
  );
}
export default Home;