import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Welcome from './components/welcome';
import Login from './components/login/login';
import Register from './components/register/register';
import DriverList from './components/drivers/driverList';
import DriverProfile from './components/drivers/driverProfile';
import RiderList from './components/riders/riderList';
import RiderProfile from './components/riders/riderProfile';
import {useDispatch} from 'react-redux';
import {LOGIN} from './actions/actions';

import './App.css';
import MyAccount from './components/myAccount';

function App() {
  const dispatch = useDispatch();
  const role = '';
  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch({type: LOGIN});
    }
  }, [dispatch])
  console.log(role === 'driver');
  return (
    <div className="App">
      <Route exact path='/' component={Welcome}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <PrivateRoute exact path='/drivers' component={DriverList}/>
      <PrivateRoute exact path='/drivers/:username' component={DriverProfile}/>
      <PrivateRoute exact path='/riders' component={RiderList}/>
      <PrivateRoute exact path='/riders/:username' component={RiderProfile}/>
      <PrivateRoute exact path='/account' component={MyAccount}/>
    </div>
  );
}

export default App;
