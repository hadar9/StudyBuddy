import Navebar from './layers/Navebar';
import HomeMenu from './layers/HomeMenu';

function Home() {
  return (
    <div className='home'>
      <Navebar />
      <div>
      <div className='content'></div>
      </div>
      <HomeMenu />
    </div>
  );
}

export default Home;
