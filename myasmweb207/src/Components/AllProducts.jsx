import React from 'react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Button } from '@material-ui/core';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {useState, useEffect} from 'react';
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

function AllProducts({cart, setcart}) {
    const [product, setproduct] = useState([]);
    useEffect(() => {
        async function getproductbyCateID() {
            const url = `http://localhost:3040/product?status=true`;
            const {data} = await axios.get(url);
            console.log(data);
            setproduct(data);
          }
          getproductbyCateID();
        
    }, []);
    const createNotification = (type) => {
        return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              break;
            case 'success':
              NotificationManager.success('Success ', 'Add To Card');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };
    
      const addToCart = async (event ,product) => {
        // console.log(event.target);
        // console.log(product);
        if(cart.map( c => c.id).indexOf(product.id) != -1){ 
            console.log("đã tồn tại");
        }else{
            console.log("chưa tồn tại");
            console.log(cart.map( c => c.id));
            console.log("pro_id---"+product.id);
            console.log("kq---:  "+cart.map( c => c.id).indexOf(product.id));
            try {
                const url = "http://localhost:3040/cart";
                const response = await axios({
                    method:'POST',
                    url: url,
                    data: {
                        id: product.id,
                        amount: 1,
                    },
                });
                if(response.status && response.status == 201){
                    console.log(response);
                    console.log("thêm thành công rồi này");
                    console.log([...cart, response.data]);
                    setcart([...cart, response.data]);

                }
            } catch (error) {
                console.error(error)
            }
        }
        
    }
    // console.log("đồng hồ nam"+productsNam);
    const aStyle1 = {
        display: "block",
        overflow: "hidden",
        padding: "5px 10px",
        border: "1px solid #fff",
        float: "right",
    }
    const aStyle2 = {
        display: "block",
        overflow: "hidden",
        padding: "5px 10px",
        border: "1px solid black",
        float: "right",
    }
    return (
        <div>
            <div class="w-4/5 mx-auto ">
            <div className="h-32"></div>
                <h1 class="text-center font-bold text-2xl">ALL PPRODUCTS</h1>
                <div class="grid lg:grid-cols-4  border-t border-gray mt-2 pt-10 relative">
                    <div class=" lg:col-span-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-center">
                    {product.map((x, index) => 
                        (
                            <div className=" border border-gray-400 rounded-lg px-1 py-3" key={index}>
                                <div className="w-11/12 mx-auto my-1 ">
                                    <img className="transition delay-750 duration-700 ease-in-out transform hover:scale-110" style={{height:"228px"}} src={x.image} alt=""/>
                                </div>
                                <div className="">
                                    <p>{x.name}</p>
                                </div>
                                <div className="text-gray-500 text-xs">
                                    <span>{x.description}</span>
                                </div>
                                <div className="font-bold text-red-800">
                                    <p>{x.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}$</p>
                                </div>
                                <div onClick={createNotification('success')}>
                                    <Button startIcon={<AddShoppingCartIcon/>} color="secondary" onClick={event => addToCart(event, x) }> Add to cart </Button>
                                </div>
                            </div>
                        )
                    )}
                    <NotificationContainer/>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default AllProducts;
AllProducts.propTypes = propTypes;