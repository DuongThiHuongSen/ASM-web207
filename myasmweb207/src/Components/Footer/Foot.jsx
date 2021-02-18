import img1 from '../image/tongDai.png';
import img2 from '../image/hotro.png';
import img3 from '../image/tuVan.png';
import { BrowserRouter as Link } from "react-router-dom";

function Foot(params) {
    return(
        <div>
            <div class="w-full bg-gray-900 mt-20 py-10">
            <div class="w-3/4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grig-cols-4 gap-10 ">
                <div class="mt-5 mb-10">
                    <Link to=""><img class="mb-4" src={img1} alt=""/></Link>
                    <Link to=""><img class="mb-4" src={img2} alt=""/></Link>
                    <Link to=""><img src={img3} alt=""/></Link>
                </div>
                <div class="mt-5 mb-5 text-white">
                  <span class="hover:text-red-500"><Link to="">CHĂM SÓC KHÁCH HÀNG</Link></span>
                  <ul class="mt-3 text-sm text-gray-500">
                      <li class="py-1 hover:text-red-500"><Link to="">Hướng dẫn mua hàng</Link></li>
                      <li class="py-1 hover:text-red-500"><Link to="">Chính sách đổi trả</Link></li>
                      <li class="py-1 hover:text-red-500"><Link to="">Chính sách bảo hành</Link></li>
                      <li class="py-1 hover:text-red-500"><Link to="">Tra cứu bảo hành</Link></li>
                  </ul>
                </div>
                <div class="mt-5 mb-5 text-white">
                    <span class="hover:text-red-500"><Link to="">VỀ ADCSHOP</Link></span>
                    <ul class="mt-3 text-sm text-gray-500">
                        <li class="py-1 hover:text-red-500"><Link to="">Giới thiệu về ADCshop</Link></li>
                        <li class="py-1 hover:text-red-500"><Link to="">Triết lý kinh doanh</Link></li>
                        <li class="py-1 hover:text-red-500"><Link to="">Giấy chứng nhận và giải thưởng</Link></li>
                        <li class="py-1 hover:text-red-500"><Link to="">Đánh giá của khách hàng</Link></li>
                    </ul>
                </div>
                <div class="mt-5 mb-5 text-white">
                    <span class="hover:text-red-500"><Link to="">TIỆN ÍCH</Link></span>
                    <ul class="mt-3 text-sm text-gray-500">
                        <li class="py-1 hover:text-red-500"><Link to="">Kiến thức đồng hồ</Link></li>
                        <li class="py-1 hover:text-red-500"><Link to="">Thông tin liên hệ</Link></li>
                        <li class="py-1 hover:text-red-500"><Link to="">Tuyển dụng</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Foot;