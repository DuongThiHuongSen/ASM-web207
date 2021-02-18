import './App.css';
import React from 'react';
import ListProducts from './components/ListProducts';
import {useState, useEffect} from 'react';
import CreateProduct from './components/CreateProduct';
import Container from '@material-ui/core/Container';
import axios from 'axios';
function App() {
  const initValue = [];
  const [products, setproduct] = useState(initValue);
  const [clickRow, setClickRow] = useState(-1);
  const [formData, setformData] = useState({
    id: '',
    name: '',
    price: ''
  });
  const url = 'https://600e390d3bb1d100179de8b4.mockapi.io/products/product';
  useEffect(() => {
    axios({
      method:'GET',
      url: url,
    }).then((response)=>{
      const {data} = response;
      setproduct(data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return(
    <div >
      {/* <Teacher info={obj}/>
      <ClickCount /> */}
      <Container maxWidth="md">
        <CreateProduct 
          clickRow={clickRow} 
          formData={formData} 
          setformData={setformData}
          setproduct={setproduct}
          product={products}
          setClickRow ={setClickRow}
          />
        <ListProducts 
          product={products}
          setproduct={setproduct}
          setformData={setformData} // set giá trị cho form hiển thị
          setClickRow ={setClickRow}
          clickRow={clickRow} />
      </Container>
      
    </div>
    
  );
}

export default App;
