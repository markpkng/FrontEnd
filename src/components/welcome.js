import React, {useState} from 'react';
import {decode} from './decode';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import Modal from './modals/modal';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {toggleRegisterModal} from '../actions/actions';

const WelcomeWrap = styled.div `
    width: 100%;
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: 0 50%;
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
    width: 90%;
    max-width: 600px;
`;

const CTA = styled.div `
    margin: 5rem;
`;

const WelcomeBox = styled.div`
    background: rgba(89, 114, 67, 0.5);
    border-radius: 1rem;
    padding: 3rem;
`;

const Welcome = () => {
    const dispatch = useDispatch();
    const registerModal = useSelector(state => state.registerModal);
    const username = localStorage.getItem('bfl-token') ? decode(localStorage.getItem('bfl-token')).username : '';
    const role = localStorage.getItem('bfl-token') ? decode(localStorage.getItem('bfl-token')).role : '';
    console.log((role === 'driver').toString());
    const riderImage = 'url('+require('../images/rider_main.webp')+')';
    const driverImage = 'url('+require('../images/driver_main.jpg')+')';
    const welcomeImage = 'url('+require('../images/motorcycleride.jpg')+')';

    const turnOffModal = () => {
        dispatch(toggleRegisterModal());
    }
    
    return(
        <WelcomeWrap style={{backgroundImage: role === 'driver' ? driverImage : role === 'rider' ? riderImage : welcomeImage}}>
            <InnerDiv>
                <Modal open={registerModal} message='Your account was successfully registered and you are now logged in!' title='Register Success' action={turnOffModal}/>}
                <WelcomeBox>
                {username ? <Div>Welcome {username}!</Div> : <Div>Welcome!</Div>}
                {role && role === 'driver' ? <Message>Thank you for being a Ride For Life driver!</Message> : (
                <Message>If you're offered a seat on on a rocket ship, don't ask what seat! Just get on.</Message>)}
                </WelcomeBox>
                <CTA>
                    {role && (role === 'driver' ? <Link to='/riders'><Button className='cta'>Find A Rider In Need</Button></Link> : (
                        <Link to='/drivers'><Button className='cta'>Find An Available Driver</Button></Link>))}
                </CTA>
            </InnerDiv>
        </WelcomeWrap>
    );
}

export default Welcome;