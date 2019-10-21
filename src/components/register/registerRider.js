import React from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import {Form, FormGroup, Input, Button, Alert} from 'reactstrap';
import {useSelector} from 'react-redux';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 0 auto;
`

const Warning = {
    fontSize: '20px',
}

const RegisterRider = ({role, input}) => {
    const error = useSelector(state => state.error);
    const {
        username, handleUsername,
        password, handlePassword,
        confirmPassword, handleConfirmPassword,
        name, handleName,
        location, handleLocation
    } = input;
    return (
        <Form>
            <FlexColumn>
                {!role && <Redirect to='/register/role'/>}
                {role && role === 'driver' && <Redirect to='/register/driver'/>}
                {error && <Alert color="warning"><h2 style={Warning}>{error}</h2></Alert>}
                <h2>Rider Registration</h2>
                <FormGroup>
                <Input type='text' placeholder='Username' value={username} onChange={e => handleUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                <Input type='password' placeholder='Password' value={password} onChange={e => handlePassword(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                <Input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={e => handleConfirmPassword(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                <Input type='text' placeholder='Name' value={name} onChange={e => handleName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                <Input type='text' placeholder='Location' value={location} onChange={e => handleLocation(e.target.value)}/>
                </FormGroup>
                <Button type='submit'>Sign Up</Button>
            </FlexColumn>
        </Form>
    );
}

export default RegisterRider;