import Img1 from '../image/479-4796343_free-shipping-png-fast-shipping-icon-png-transparent.png';
import Img2 from '../image/97-978930_help-desk-icon-png-transparent-png.png';
import Img3 from '../image/images.png';

function Introduce() {
    return(
        <div>
            <div class="w-3/4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mx-auto mt-20">
            <div class="text-center px-7 xs:border-b md:border-r lg:border-r border-gray-400">
                <div class=" mx-auto mb-5 border-2 border-gray-400 h-12 w-12 flex items-center justify-center rounded-full p-2">
                    <img src={Img1} alt=""/>
                </div>
                <span class="font-bold text-gray-500">MIỄN PHÍ VẬN CHUYỂN TRÊN TẤT CẢ CÁC ĐƠN HÀNG</span>
                <p class="text-gray-400">Nhận Giao hàng Miễn phí cho tất cả các đơn đặt hàng trên 3tr và trả hàng miễn phí 
                    tại trung tâm của chúng tôi! Hàng được gửi và sẽ đến nơi sau 5-8 ngày.</p>
            </div>
            <div class="text-center px-7 xs:border-b md:border-r lg:border-r border-gray-400">
                <div class="mx-auto mb-5 border-2 border-gray-400 h-12 w-12 flex items-center justify-center rounded-full p-2">
                    <img src={Img2} alt=""/>
                </div>
                <span class="font-bold text-gray-500">DỊCH VỤ KHÁCH HÀNG TUYỆT VỜI</span>
                <p class="text-gray-400">Mọi thắc mắc của bạn về chúng tôi sẽ được chúng tôi trả lời tận tình và đưa
                     ra cho bạn những dịch vụ tốt nhất của chúng tôi. Nó sẽ khiến bạn hài lòng về nó.</p>
            </div>
            <div class="text-center px-7">
                <div class="mx-auto mb-5 border-2 border-gray-400 h-12 w-12 flex items-center justify-center rounded-full p-2">
                    <img src={Img3} alt=""/>
                </div>
                <span class="font-bold text-gray-500">KHÔNG CÓ PHÍ HẢI QUAN VÀ THUỂ</span>
                <p class="text-gray-400">Chúng tôi trả những khoản phí này để bạn không phải trả! Tổng thanh toán khi thanh
                     toán là số tiền cuối cùng bạn thanh toán, đã bao gồm VAT, không tính thêm phí tại thời điểm giao hàng!</p>
            </div>
        </div>
        </div>
    );
}
export default Introduce;