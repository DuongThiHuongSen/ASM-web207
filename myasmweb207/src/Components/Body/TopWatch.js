import React from 'react'
import Untitled from '../image/Untitled.png';
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Button } from '@material-ui/core';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function TopWatch({productsNam, productsNu , cart, setcart, formData}) {
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
                    setcart(...cart, response.data);
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
            <div class="w-4/5 mx-auto mt-20">
                <h1 class="text-center font-bold text-2xl font-serif">TOP MEN'S WATCH</h1>
                <div class="grid lg:grid-cols-4  border-t border-gray mt-2 pt-10 relative">
                    <div class="w-4/5   hidden sm:hidden md:hidden lg:block ">
                        <div className="absolute top-28 left-20 text-white">
                            <h2 className="text-xl">ĐỒNG HỒ NAM</h2>
                            <Link to="" style={aStyle1}>Xem tất cả ></Link>
                        </div>
                        <img class="ali" src="https://cdn.tgdd.vn/v2015/Content/desktop/images/V5/category/fashion-watch-men-bg.png" alt="" />
                    </div>
                    <div class=" lg:col-span-3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-center">
                    {productsNam.map((x, index) => 
                        (
                            <div className=" border border-gray-400 rounded-lg px-1 py-3" key={index}>
                                <div className="w-4/5 mx-auto my-1 ">
                                    <img className="transition delay-750 duration-700 ease-in-out transform hover:scale-110" src={x.image} alt=""/>
                                </div>
                                <div className="">
                                    <p>{x.name}</p>
                                </div>
                                <div className="text-gray-500 text-xs">
                                    <span>{x.description}</span>
                                </div>
                                <div className="font-bold text-red-800">
                                    <p>{x.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}VNĐ</p>
                                </div>
                                <div onClick={createNotification('success')}>
                                    <Button startIcon={<AddShoppingCartIcon/>} color="secondary" onClick={event => addToCart(event, x) }> Thêm vào giỏ hàng </Button>
                                </div>
                            </div>
                        )
                    )}
                    <NotificationContainer/>
                    </div>
                </div>
            </div>
            <div class="w-full mt-20">
                <Link to=""><img src={Untitled} alt=""/></Link>
            </div>
            <div class="w-4/5 mx-auto mt-20">
                <h1 class="text-center font-bold text-2xl font-serif">TOP WOMEN'S WATCH</h1>
                <div class="grid lg:grid-cols-4  border-t border-gray mt-2 pt-10 ">
                    <div class=" lg:col-span-3 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-center">
                    {productsNu.map((x) => 
                        (
                            <div className=" border border-gray-400 rounded-lg px-1 py-3">
                                <div className="w-4/5 mx-auto my-1 ">
                                    <img className="transition delay-750 duration-700 ease-in-out transform hover:scale-110" src={x.image} alt=""/>
                                </div>
                                <div className="">
                                    <p>{x.name}</p>
                                </div>
                                <div className="text-gray-500 text-xs">
                                    <span>{x.description}</span>
                                </div>
                                <div className="font-bold text-red-800">
                                    <p>{x.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}VNĐ</p>
                                </div>
                                <div onClick={createNotification('success')}>
                                    <Button startIcon={<AddShoppingCartIcon/>} color="secondary" onClick={event => addToCart(event, x)}> Thêm vào giỏ hàng </Button>
                                    <NotificationContainer/>
                                </div>
                                
                            </div>
                        )
                    )}
                    
                    </div>
                    <div class="w-4/5  ml-20 hidden sm:hidden md:hidden lg:block relative">
                        <div className="absolute top-28 right-20 text-black">
                            <h2 className="text-xl">ĐỒNG HỒ NỮ</h2>
                            <Link to="" style={aStyle2} >Xem tất cả > </Link>
                        </div>
                        <Link to=""><img class="ali" src="https://cdn.tgdd.vn/v2015/Content/desktop/images/V5/category/fashion-watch-girl-bg.png" alt=""/></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TopWatch;
