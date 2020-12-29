import Navebar from './layers/Navebar';
import HomeMenu from './layers/HomeMenu';
import Chat from './layers/Chat';

function Home() {
  return (
    <div className='home'>
      <Navebar />
      <div>
        <HomeMenu />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
