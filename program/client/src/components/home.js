import Navebar from './layers/Navebar';
import HomeMenu from './layers/HomeMenu';

function Home() {
 
  return (
    <div className='home'>
      <Navebar />
      <div>
        <div className='content'></div>
        <HomeMenu />
      </div>
    </div>
  );
}

export default Home;
