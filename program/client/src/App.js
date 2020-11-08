import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Landing from './components/layers/Landing';

//Redux
import {Provider} from 'react-redux';
import store from './store/store';

//import Home from './components/Home';
function App() {
  return (
<Provider store={store}>
    <Router>
    <div className="App">
    <Route exact path="/" component={Landing}></Route>
      <section className="container">
      <Switch>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      </Switch>
      </section>
    </div>
    </Router>
    </Provider>

    /*<Home/>*/

  );
}

export default App;
