import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {Alert} from 'reactstrap';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
`

const RegisterRider = ({role, input, errorHandling}) => {
    const {
        username, handleUsername,
        password, handlePassword,
        confirmPassword, handleConfirmPassword,
        name, handleName,
        location, handleLocation
    } = input;

    const {
        matchPass
    } = errorHandling;
    return (
        <FlexColumn>
            {!role && <Redirect to='/register/role'/>}
            {role && role === 'driver' && <Redirect to='/register/driver'/>}
            <h2>Rider Registration</h2>
          
            <input type='text' placeholder='Username *' value={username} onChange={e => handleUsername(e.target.value)} required/>
       
            <input type='password' placeholder='Password *' value={password} onChange={e => handlePassword(e.target.value)} required/>
     
            {!matchPass && <Alert color='warning'>Passwords do not match.</Alert>}
            <input type='password' placeholder='Confirm Password *' value={confirmPassword} onChange={e => handleConfirmPassword(e.target.value)} required/>
      
            <input type='text' placeholder='Name *' value={name} onChange={e => handleName(e.target.value)} required/>
      
            <input type='text' placeholder='Location' value={location} onChange={e => handleLocation(e.target.value)}/>
          
            <button type='submit'>Sign Up</button>
        </FlexColumn>
    );
}

export default RegisterRider;