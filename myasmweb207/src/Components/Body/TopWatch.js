import React, { Component } from 'react'
import Menimg from '../image/nam.jpg';
import Untitled from '../image/Untitled.png';
import Nuimg from '../image/nu.jpg';
import { BrowserRouter as Link } from "react-router-dom";

function Product_nho (props){
    return(
        <Link to="">
            <div className=" border border-gray-400 rounded-lg px-1 py-3">
                <div className="w-4/5 mx-auto my-1 ">
                    <img className="transition delay-750 duration-700 ease-in-out transform hover:scale-110" src={props.anh} alt=""/>
                </div>
                <div className="">
                    <p>{props.name}</p>
                </div>
                <div className="text-gray-500 text-xs">
                    <span>{props.description}</span>
                </div>
                <div className="font-bold text-red-800">
                    <p>{props.price}</p>
                </div>
            </div>
        </Link>
    );
}

const categoryNams = [
    {name:'OG358.61AGR-GL', description: 'Ogival Nam - 42mm - Kính Sapphire', price:'20.780.000₫', anh: 'https://xwatch.vn/images/products/2020/04/28/large/dongho-ogival-og35861agr-gl-avatar_1588061214.jpg'},
    {name:'OG358.61AGR-GL', description: 'Ogival Nam - 42mm - Kính Sapphire', price:'20.780.000₫', anh: 'https://xwatch.vn/images/products/2020/12/17/large/dong-ho-orient-ra-as0102s10b_1608172008.jpg'},
    {name:'OG358.61AGR-GL', description: 'Ogival Nam - 42mm - Kính Sapphire', price:'20.780.000₫', anh: 'https://xwatch.vn/images/products/2020/04/23/large/dong-ho-ogival-og358652agsr-t-1_1587629316.jpg'},
    {name:'OG358.61AGR-GL', description: 'Ogival Nam - 42mm - Kính Sapphire', price:'20.780.000₫', anh: 'https://xwatch.vn/images/products/2020/02/20/large/olym-pianus-op89322sk-t_1582195019.jpg'},
];
const categoryNus = [
    {name:'OG358.61AGR-GL', description: 'Ogival Nam - 42mm - Kính Sapphire', price:'20.780.000₫', anh: 'https://xwatch.vn/images/products/2019/08/12/large/1-28.jpg'},
    {name:'OG358.61AGR-GL', description: 'Ogival Nam - 42mm - Kính Sapphire', price:'20.780.000₫', anh: 'https://xwatch.vn/images/products/2020/05/04/large/dong-ho-freelook-fl2101541_1588564448.jpg'},
    {name:'OG358.61AGR-GL', description: 'Ogival Nam - 42mm - Kính Sapphire', price:'20.780.000₫', anh: 'https://xwatch.vn/images/products/2020/04/22/large/dong-ho-op-opa58082lsk-t-1_1587529717.jpg'},
    {name:'OG358.61AGR-GL', description: 'Ogival Nam - 42mm - Kính Sapphire', price:'20.780.000₫', anh: 'https://xwatch.vn/images/products/2020/02/28/large/olypia-star-opa28019dlk-t_1582883903.jpg'},
];
const cateNams = categoryNams.map((x) => 
(
    <Product_nho name={x.name} description={x.description} price = {x.price} anh={x.anh}/>
)
);

const cateNus = categoryNus.map((x) => 
(
    <Product_nho name={x.name} description={x.description} price = {x.price} anh={x.anh}/>
)
);

export default class TopMentWatch extends Component {
  render() {
    return (
        <div>
            <div class="w-4/5 mx-auto mt-20">
                <h1 class="text-center font-bold text-2xl font-serif">TOP MEN'S WATCH</h1>
                <div class="grid lg:grid-cols-4  border-t border-gray mt-2 pt-10 ">
                    <div class="w-4/5   hidden sm:hidden md:hidden lg:block ">
                        <Link to=""><img class="ali" src={Menimg} alt="" /></Link>
                    </div>
                    <div class=" lg:col-span-3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-center">
                    {cateNams}
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
                    {cateNus}
                    </div>
                    <div class="w-4/5  ml-20 hidden sm:hidden md:hidden lg:block ">
                        <Link to=""><img class="ali" src={Nuimg} alt=""/></Link>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
