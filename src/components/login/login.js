import React from 'react';
import Header from '../header';
import LoginForm from './loginForm';

const Login = (props) => {
    return (
        <div>
            <Header/>
            <h1>Login Page</h1>
            <LoginForm {...props}/>
        </div>
    );
}

export default Login;