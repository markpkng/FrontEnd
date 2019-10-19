import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
`

const RegisterDriver = ({type}) => {
    return (
        <FlexColumn>
            {!type && <Redirect to='/register/type'/>}
            <h2>Driver</h2>
            <input type='text' placeholder='Username'/>
            <input type='password' placeholder='Password'/>
            <input type='text' placeholder='Name'/>
            <input type='text' placeholder='Location'/>
            <input type='text' placeholder='Price'/>
            <input type='text' placeholder='Bio'/>
            <button>Sign Up</button>
        </FlexColumn>
    );
}

export default RegisterDriver;