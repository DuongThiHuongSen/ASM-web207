import Head from './Header/header';
import Banner from './Header/Banner';
import Category from './Body/Category';
import TopWatch from './Body/TopWatch';
import Introduce from './Body/Introduction'; 
import Foot from './Footer/Foot';
function Home(params) {
    return(
        <div class="w-full mx-auto">
        <Head/>
        <Banner/>
        <Category/>
        <TopWatch/>
        <Introduce/>
        <Foot/>
      </div>
    );
}
export default Home;