import React from 'react';
import LoginForm from './loginForm';
import styled from 'styled-components';

const OuterDiv = styled.div `
    width: 100%;
    background: #E6E8e5;
    padding: 1rem;
    border-radius: 5px;
    max-width: 500px;

    h1 {
        font-size: 4rem;
    }
`

const Login = (props) => {
    return (
        <OuterDiv>
            <h1>Login</h1>
            <LoginForm {...props}/>
        </OuterDiv>
    );
}

export default Login;