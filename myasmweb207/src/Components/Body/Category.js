// import { Component } from "react";
import React from 'react';

// import { BrowserRouter as Link } from "react-router-dom";


function Category({cate}) {
    // console.log(cate);
    return (
        <div className="w-4/5 mx-auto mt-20">
        <h1 className="text-center font-bold text-2xl font-serif">DANH MỤC</h1>
        <div className=" mt-2 pt-6 border-t border-gray grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-5 text-sm text-red-800">
        {cate.map( (x) => (
            <div>
                <div className="relative  border border-gray-400 rounded-md font-medium">
                    <div className="absolute z-10 bg-gray-300 bg-opacity-50 w-11/12 bottom-1 ml-2 text-center py-1 ">
                        <p>{x.category_name}</p>
                    </div>
                    <div className="w-3/5 mx-auto ">
                        <img className="" src={x.image} alt=""/>
                    </div>
                </div>
            </div>
            
        ))}
        </div>
    </div>
    )
}
export default Category;