import React, {useState} from 'react';
import {decode} from './decode';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {uploadImage} from '../actions/actions';

const Image = styled.img `
    width: 50%;
    // border-radius: 10px;
    // box-shadow: 10px 10px 10px darkgreen;
`
const Div = styled.div `
    font-family: 'Passion One';
    font-size: 5rem;
`
const WelcomeWrap = styled.div `
    width: 100%;
    min-height: 88vh;
    /* // background-image: url(../images/motorcycleride.jpg); */

`

const Message = styled.div `
    margin-top: 2rem;
    font-family: 'Patua One', sans-serif;
    font-size: 3rem;
`

const Welcome = () => {
    const dispatch = useDispatch();
    const username = localStorage.getItem('bfl-token') ? decode(localStorage.getItem('bfl-token')).username : '';
    const role = localStorage.getItem('bfl-token') ? decode(localStorage.getItem('bfl-token')).role : '';
    
    return(
        <WelcomeWrap style={{backgroundImage: 'url('+require('../images/motorcycleride.jpg')+')'}}>
            {username ? <Div>Welcome {username}!</Div> : <Div>Welcome!</Div>}
            {/* <Image src={require('../images/motorcycleride.jpg')}/> */}
            {role && role === 'driver' ? <Message>Thank you for being a Ride For Life driver!</Message> : (
                <Message>If you're offered a seat on on a rocket ship, don't ask what seat! Just get on.</Message>)}
        </WelcomeWrap>
    );
}

export default Welcome;