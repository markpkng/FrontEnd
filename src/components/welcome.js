import React, {useState} from 'react';
import {decode} from './decode';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {uploadImage} from '../actions/actions';

const WelcomeWrap = styled.div `
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Div = styled.div `
    font-family: 'Passion One';
    font-size: 6rem;
    color: white;
    text-shadow: 1px 1px 1px grey;
`

const Message = styled.div `
    margin-top: 3rem;
    font-family: 'Patua One', sans-serif;
    font-size: 3rem;
    color: white;
    text-shadow: 1px 1px 1px grey;
`
const InnerDiv = styled.div `
    height: 100%;
    width: 100%;
    padding: 2%;
`



const Welcome = () => {
    const dispatch = useDispatch();
    const username = localStorage.getItem('bfl-token') ? decode(localStorage.getItem('bfl-token')).username : '';
    const role = localStorage.getItem('bfl-token') ? decode(localStorage.getItem('bfl-token')).role : '';
    
    return(
        <WelcomeWrap style={{backgroundImage: 'url('+require('../images/motorcycleride.jpg')+')'}}>
            <InnerDiv>
                {username ? <Div>Welcome {username}!</Div> : <Div>Welcome!</Div>}
                {role && role === 'driver' ? <Message>Thank you for being a Ride For Life driver!</Message> : (
                <Message>If you're offered a seat on on a rocket ship, don't ask what seat! Just get on.</Message>)}
            </InnerDiv>
        </WelcomeWrap>
    );
}

export default Welcome;