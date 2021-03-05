import Navebar from './navebar/Navebar';
import HomeMenu from './homemenue/HomeMenu';
import Chat from './chat/Chat';

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
