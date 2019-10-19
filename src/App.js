import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import Welcome from './components/welcome';
import Login from './components/login/login';
import Register from './components/register/register';
import DriverList from './components/drivers/driverList';
import DriverProfile from './components/drivers/driverProfile';
import Reviews from './components/reviews/reviews';
import ReviewPage from './components/reviews/reviewPage';
import {useDispatch} from 'react-redux';
import {LOGIN} from './actions/actions';

import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch({type: LOGIN});
    }
  }, [dispatch])
  return (
    <div className="App">
      <Route exact path='/' component={Welcome}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <PrivateRoute exact path='/drivers' component={DriverList}/>
      <PrivateRoute exact path='/drivers/:username' component={DriverProfile}/>
      <PrivateRoute exact path='/reviews' component={Reviews}/>
      <PrivateRoute exact path='/reviews/:id' component={ReviewPage}/>
    </div>
  );
}

export default App;
