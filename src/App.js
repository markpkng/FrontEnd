import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import DriverList from './components/dirverList';
import DriverProfile from './components/driverProfile';

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Welcome}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route exact path='/drivers' component={DriverList}/>
      <Route exact path='/drivers/:username' component={DriverProfile}/>
    </div>
  );
}

export default App;
