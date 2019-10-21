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
import RiderAccount from './components/riders/riderAccount';
import DriverAccount from './components/drivers/driverAccount';
import LoadingOverlay from 'react-loading-overlay';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN} from './actions/types';
import MyAccount from './components/myAccount';
import './App.css';

const StyledLoader = styled(LoadingOverlay) `
    height: 100vh;
`

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

  useEffect(() => {
    if(localStorage.getItem('bfl-token') && localStorage.getItem('bfl-role')){
      dispatch({type: LOGIN, payload: localStorage.getItem('bfl-role')});
    }
  }, [dispatch])
  
  return (
    <div className="App">
      <StyledLoader active={loading} spinner text='Loading...'>
        <Route exact path='/' component={Welcome}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <PrivateRoute exact path='/drivers' component={DriverList}/>
        <PrivateRoute exact path='/drivers/:id' component={DriverProfile}/>
        <PrivateRoute exact path='/riders' component={RiderList}/>
        <PrivateRoute exact path='/riders/:id' component={RiderProfile}/>
        <PrivateRoute exact path='/account' component={localStorage.getItem('bfl-role') === 'rider' ? RiderAccount : DriverAccount}/>
      </StyledLoader>
    </div>
  );
}

export default App;
