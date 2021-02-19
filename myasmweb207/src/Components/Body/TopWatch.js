import React, { Component } from 'react'
import Menimg from '../image/nam.jpg';
import Untitled from '../image/Untitled.png';
import Nuimg from '../image/nu.jpg';
import { BrowserRouter as Link } from "react-router-dom";

function TopWatch({productsNam, productsNu}) {
    console.log("đồng hồ nam"+productsNam);
    return (
        <div>
            <div class="w-4/5 mx-auto mt-20">
                <h1 class="text-center font-bold text-2xl font-serif">TOP MEN'S WATCH</h1>
                <div class="grid lg:grid-cols-4  border-t border-gray mt-2 pt-10 ">
                    <div class="w-4/5   hidden sm:hidden md:hidden lg:block ">
                        <Link to=""><img class="ali" src={Menimg} alt="" /></Link>
                    </div>
                    <div class=" lg:col-span-3 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center text-center">
                    {productsNam.map((x, index) => 
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
                                    <p>{x.price}</p>
                                </div>
                            </div>
                        )
                    )}
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
                                    <p>{x.price}</p>
                                </div>
                            </div>
                        )
                    )}
                    </div>
                    <div class="w-4/5  ml-20 hidden sm:hidden md:hidden lg:block ">
                        <Link to=""><img class="ali" src={Nuimg} alt=""/></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TopWatch;
