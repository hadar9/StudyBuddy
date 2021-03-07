import Navebar from './navebar/Navebar';
import Content from './content/Content';
import Chat from './chat/Chat';

function Home() {
  return (
    <div className='home'>
      <Navebar />
      <div>
        <Content />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
