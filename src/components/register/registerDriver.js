import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {Alert} from 'reactstrap';


const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 0 auto;

    button {
        font-size: 1.5rem;
        width: 200px;
    }

    h1 {
        font-size: 4rem;
    }
`
const Input = styled.input `
    width: 100%;
    font-size: 1.5rem;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    border: 1px solid green;
`

const RegisterDriver = ({role, input, errorHandling}) => {
    const {
        username, handleUsername,
        password, handlePassword,
        confirmPassword, handleConfirmPassword,
        name, handleName,
        location, handleLocation,
        price, handlePrice,
        bio, handleBio
    } = input;

    const {
        matchPass, setMatchPass
    } = errorHandling;

    return (
            <FlexColumn>
                {!role && <Redirect to='/register/role'/>}
                {role && role === 'rider' && <Redirect to='/register/driver'/>}
                <h1>Driver Registration</h1>
            
                <Input type='text' placeholder='Username *' value={username} onChange={e => handleUsername(e.target.value)} required/>
             
              
                <Input type='password' placeholder='Password *' value={password} onChange={e => handlePassword(e.target.value)} required/>
           
                {!matchPass && <Alert color='warning'>Passwords do not match.</Alert>}
                <Input type='password' placeholder='Confirm Password *' value={confirmPassword} onChange={e => handleConfirmPassword(e.target.value)} required/>
            
            
                <Input type='text' placeholder='Name *' value={name} onChange={e => handleName(e.target.value)} required/>
           
                <Input type='text' placeholder='Location *' value={location} onChange={e => handleLocation(e.target.value)} required/>
            
                <Input type='text' placeholder='Price *' value={price} onChange={e => handlePrice(e.target.value)} required/>
            
                <Input type='text' placeholder='Bio *' value={bio} onChange={e => handleBio(e.target.value)} required/>
            
                <button type='submit'>Sign Up</button>
            </FlexColumn>
    );
}

export default RegisterDriver;