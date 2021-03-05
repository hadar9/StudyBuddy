import './App.css';
import React, { useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/layers/Home';
import Profile from './components/layers/navebar/profile/Profile';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Route exact path='/' component={Landing}></Route>
          <PrivateRoute exact path='/home' component={Home}></PrivateRoute>
          <Switch>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
            <PrivateRoute
              exact
              path='/profile'
              component={Profile}
            ></PrivateRoute>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
