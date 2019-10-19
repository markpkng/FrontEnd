import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
`

const RegisterRider = ({type}) => {
    return (
        <FlexColumn>
            {!type && <Redirect to='/register/type'/>}
            <h2>Rider</h2>
            <input placeholder='Username'/>
            <input placeholder='Password'/>
            <input placeholder='Name'/>
            <input placeholder='Location'/>
            <button>Sign Up</button>
        </FlexColumn>
    );
}

export default RegisterRider;