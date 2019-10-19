import React from 'react';
import {Route} from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';

import './App.css';

function App() {
  return (
    <div>
      <Route exact path='/' component={Welcome}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </div>
  );
}

export default App;
