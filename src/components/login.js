import React from 'react';
import Header from './header';
import LoginForm from './loginForm';

const Login = () => {
    return (
        <div>
            <Header/>
            <h1>Login Page</h1>
            <LoginForm/>
        </div>
    );
}

export default Login;