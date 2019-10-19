import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
`

const RegisterDriver = ({role, input}) => {
    const {
        username, handleUsername,
        password, handlePassword,
        confirmPassword, handleConfirmPassword,
        name, handleName,
        location, handleLocation,
        price, handlePrice,
    } = input;

    return (
        <FlexColumn>
            {!role && <Redirect to='/register/role'/>}
            {role && role === 'rider' && <Redirect to='/register/driver'/>}
            <h2>Driver</h2>
            <input type='text' placeholder='Username' value={username} onChange={e => handleUsername(e.target.value)}/>
            <input type='password' placeholder='Password' value={password} onChange={e => handlePassword(e.target.value)}/>
            <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={e => handleConfirmPassword(e.target.value)}/>
            <input type='text' placeholder='Name' value={name} onChange={e => handleName(e.target.value)}/>
            <input type='text' placeholder='Location' value={location} onChange={e => handleLocation(e.target.value)}/>
            <input type='text' placeholder='Price' value={price} onChange={e => handlePrice(e.target.value)}/>
            <button type='submit'>Sign Up</button>
        </FlexColumn>
    );
}

export default RegisterDriver;