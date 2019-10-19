import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
`

const RegisterRider = ({role, input}) => {
    const {
        username, handleUsername,
        password, handlePassword,
        confirmPassword, handleConfirmPassword,
        name, handleName,
        location, handleLocation
    } = input;
    return (
        <FlexColumn>
            {!role && <Redirect to='/register/role'/>}
            {role && role === 'driver' && <Redirect to='/register/driver'/>}
            <h2>Rider</h2>
            <input placeholder='Username' value={username} onChange={e => handleUsername(e.target.value)}/>
            <input placeholder='Password' value={password} onChange={e => handlePassword(e.target.value)}/>
            <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={e => handleConfirmPassword(e.target.value)}/>
            <input placeholder='Name' value={name} onChange={e => handleName(e.target.value)}/>
            <input placeholder='Location' value={location} onChange={e => handleLocation(e.target.value)}/>
            <button type='submit'>Sign Up</button>
        </FlexColumn>
    );
}

export default RegisterRider;