// import { Component } from "react";
import React, { Component } from 'react';
import anh1 from '../image/dong-ho-op-op9908-88agsk-gl-t-12_1587703946.jpg';
import anh2 from '../image/dong-ho-op-op24591dlk-t-1_1587617786.jpg';
import anh3 from '../image/donghodoi-festina-f20005-1f20006-1_1581568490.jpg';
import anh4 from '../image/donghodoi-festina-f20005-1f20006-1_1581568490.jpg';
import anh5 from '../image/smile-kid-sl017-01-tre-em-1-600x600.jpg';
import anh6 from '../image/4dec614e5951cab3a7888d8b119d55f3.jpg';
import { BrowserRouter as Link } from "react-router-dom";

function Product_nho (props){
    return(
        <div>
            <Link to=""><div className={props.className}>
                <div className="absolute z-10 bg-gray-300 bg-opacity-50 w-11/12 bottom-1 ml-2 text-center py-1 ">
                    <p>{props.content}</p>
                </div>
                <div className="w-3/5 mx-auto ">
                    <img className="" src={props.tenAnh} alt=""/>
                </div>
            </div>
            </Link>
        </div>
    );
}

const categorys = [
    {tenAnh: anh1, content:'ĐỒNG HỒ NAM', className: 'relative  border border-gray-400 rounded-md font-medium '},
    {tenAnh: anh2, content:'ĐỒNG HỒ NỮ', className: 'relative  border border-gray-400 rounded-md font-medium '},
    {tenAnh: anh3, content:'ĐỒNG HỒ ĐÔI', className: 'relative  border border-gray-400 rounded-md font-medium '},
    {tenAnh: anh4, content:'ĐỒNG HỒ TRẺ EM', className: 'relative  border border-gray-400 rounded-md font-medium h-full'},
    {tenAnh: anh5, content:'ĐỒNG HỒ THÔNG MINH', className: 'relative  border border-gray-400 rounded-md font-medium h-full'},
    {tenAnh: anh6, content:'PHỤ KIỆN', className: 'relative  border border-gray-400 rounded-md font-medium h-full'}
];
const cates = categorys.map((x) => 
(
    <Product_nho tenAnh={x.tenAnh} content={x.content} className = {x.className}/>
)
);

export default class Category extends Component {
  render() {
    return (
        <div className="w-4/5 mx-auto mt-20">
        <h1 className="text-center font-bold text-2xl font-serif">DANH MỤC</h1>
        <div className=" mt-2 pt-6 border-t border-gray grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-5 text-sm text-red-600">
        {cates}
        </div>
    </div>
    )
  }
}