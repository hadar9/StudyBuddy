import './App.css';
import React, { useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Profile from './components/Profile';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
//Redux
import { Provider } from 'react-redux';
import store from './store/store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Route exact path='/' component={Landing}></Route>
          <section className='container'>
            <Switch>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/home' component={Home}></Route>
              <Route exact path='/profile' component={Profile}></Route>
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
