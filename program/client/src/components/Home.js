import Navebar from './layers/Navebar';
import HomeMenu from './layers/HomeMenu';

function Home() {
  return (
    <div className='home'>
      <Navebar />
      <div>
        <HomeMenu />
      </div>
    </div>
  );
}

export default Home;
