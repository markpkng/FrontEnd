import React from 'react';
import Header from '../header';
import LoginForm from './loginForm';
import {useDispatch} from 'react-redux';
import {LOGIN} from '../../actions/actions';

const Login = (props) => {
    const dispatch = useDispatch();

    const testLogin = role => {
        dispatch({type: LOGIN, payload: role})
        localStorage.setItem('token', 'test');
        props.history.push('/');
    }
    return (
        <div>
            <Header/>
            <h1>Login Page</h1>
            <button onClick={() => testLogin('rider')}>Test Login Rider</button>
            <button onClick={() => testLogin('driver')}>Test Login Driver</button>
            <LoginForm {...props}/>
        </div>
    );
}

export default Login;