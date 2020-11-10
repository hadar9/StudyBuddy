import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Landing from './components/layers/Landing';
import Home from './components/Home';
import Profile from './components/Profile';
//Redux
import {Provider} from 'react-redux';
import store from './store/store';

function App() {
  return (
<Provider store={store}>
    <Router>
    <div className="App">
    <Route exact path="/" component={Landing}></Route>
    <Route exact path="/home" component={Home}></Route>
    <Route exact path="/profile" component={Profile}></Route>
      <section className="container">
      <Switch>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      </Switch>
      </section>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
