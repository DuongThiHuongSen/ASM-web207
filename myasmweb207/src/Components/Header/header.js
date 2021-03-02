import Logo from '../image/logo_adc.png';
import Cart from '../image/icons8-fast-cart-32.png';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const propTypes = {
    cart : PropTypes.arrayOf(
        PropTypes.shape({
            id : PropTypes.number.isRequired,
            amount : PropTypes.number.isRequired
        })
    ).isRequired, // cart nhan vao phai la array .isRequied la yeu cau phai co
};
function Header({cart}) {
    return(
        <div className="flex w-full bg-gray-700 bg-opacity-60 z-20 justify-between font-serif text-xs sm:text-xs md:text-sm lg:text-sm fixed   ">
        <div className="w-1/4 ">
            <Link to="#">
                <img className="py-2 lg:py-5 pl-10 sm:pl-20 md:pl-30 lg:pl-40 lg:w-4/5" src={Logo} alt=""/>
            </Link>
        </div>
        <div className="flex w-2/4   items-center">
            <ul className="flex text-white mx-auto">
                <li className="mx-2 lg:mx-5 "><Link to="/">HOME</Link></li>
                <li className="mx-2 lg:mx-5"><Link to="/products">ALL PRODUCTS</Link></li>
                {/* <li className="mx-2 lg:mx-5"><Link to="">GIỎ HÀNG</Link></li> */}
                <li className="mx-2 lg:mx-5"><Link to="/admin">ADMIN</Link></li>
            </ul>   
        </div>  
        <div className="flex w-1/4 text-white items-center lg:pl-20">
            <Link  className="text-white  font-serif" to="#">ĐĂNG NHẬP</Link>
            <Link to="/cart" className="relative">
                <img className=" w-10 ml-5 " src={Cart} alt=""/>
                <p className="absolute top-1 right-0  h-4 w-4 flex items-center justify-center rounded-full bg-red-500 p-1">{cart.length}</p>
            </Link>
         </div>
    </div>
    );
}
export default Header
Header.propTypes = propTypes;