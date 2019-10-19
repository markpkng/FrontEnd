import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import DriverList from './components/dirverList';
import DriverProfile from './components/driverProfile';
import {useDispatch} from 'react-redux';
import {LOGIN} from './actions/actions';

import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch({type: LOGIN});
    }
  }, [])
  return (
    <div className="App">
      <Route exact path='/' component={Welcome}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <PrivateRoute exact path='/drivers' component={DriverList}/>
      <PrivateRoute exact path='/drivers/:username' component={DriverProfile}/>
    </div>
  );
}

export default App;
