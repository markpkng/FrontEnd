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
import Header from './components/header';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {LOGIN_SUCCESS} from './actions/types';
import {decode} from './components/decode';
import './App.css';
import Footer from './components/footer';

const StyledLoader = styled(LoadingOverlay) `
    height: 100vh;
`

const OuterDiv = styled.div `
  min-height: 88vh; 
  background: #9FE09F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

  useEffect(() => {
    if(localStorage.getItem('bfl-token')){
      console.log('decoded:', decode(localStorage.getItem('bfl-token')));
      dispatch({type: LOGIN_SUCCESS, payload: decode(localStorage.getItem('bfl-token')).role});
    }
  }, [dispatch])
  
  return (
    <div>
      <StyledLoader active={loading} spinner text='Loading...'>
        <Header/>
        <div className='App'>
          <OuterDiv>  
              <Route exact path='/' component={Welcome}/>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <PrivateRoute exact path='/drivers' component={DriverList}/>
              <PrivateRoute exact path='/drivers/:id' component={DriverProfile}/>
              <PrivateRoute exact path='/riders' component={RiderList}/>
              <PrivateRoute exact path='/riders/:id' component={RiderProfile}/>
              <PrivateRoute exact path='/account' component={localStorage.getItem('bfl-token') && decode(localStorage.getItem('bfl-token')).role === 'rider' ? RiderAccount : DriverAccount}/>
          </OuterDiv>
        </div>
        <Footer/>
      </StyledLoader>
    </div>
  );
}

export default App;
