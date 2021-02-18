import Logo from '../image/logo_adc.png';
import Cart from '../image/icons8-fast-cart-32.png';
import { BrowserRouter as Link } from "react-router-dom";
function Header() {
    return(
        <div className="flex w-full bg-gray-700 bg-opacity-60 z-20 justify-between font-serif text-xs sm:text-xs md:text-sm lg:text-sm fixed   ">
        <div className="w-1/4 ">
            <Link to="#">
                <img className="py-2 lg:py-5 pl-10 sm:pl-20 md:pl-30 lg:pl-40 lg:w-4/5" src={Logo} alt=""/>
            </Link>
        </div>
        <div className="flex w-2/4   items-center">
            <ul className="flex text-white mx-auto">
                <li className="mx-2 lg:mx-5 "><Link to="/product">SẢN PHẨM</Link></li>
                <li className="mx-2 lg:mx-5"><Link to="">TIN TỨC</Link></li>
                <li className="mx-2 lg:mx-5"><Link to="">HỖ TRỢ</Link></li>
                <li className="mx-2 lg:mx-5"><Link to="">ĐƠN HÀNG</Link></li>
            </ul>   
        </div>  
        <div className="flex w-1/4 text-white items-center lg:pl-20">
            <Link  className="text-white  font-serif" to="#">ĐĂNG NHẬP</Link>
            <Link to="#" className="relative">
                <img className=" w-10 ml-5 " src={Cart} alt=""/>
                <p className="absolute top-1 right-0  h-4 w-4 flex items-center justify-center rounded-full bg-red-500 p-1">1</p>
            </Link>
         </div>
    </div>
    );
}
export default Header