import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/actions';
import {decode} from './decode';
import * as v from '../styles/variables';

const HeaderContainer = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6vh;
    padding: 4rem;
    background-color: rgba(70, 53, 29, 0.6);
    position: sticky;
	overflow: hidden;
	top: 0;
    z-index: 4;

    @media screen and (max-width: 800px) {
        flex-direction: column;
        justify-content: center;
        min-height: 8vh;
    }

    @media (max-width: 500px) {
            min-height: 18vh;
    }
    @media (max-width: 385px) {
        padding: 0.5rem;
    }

    .rfl {
        font-family: 'Passion One', sans-serif;
        font-size: 4rem;
        @media (max-width: 850px) {
            font-size: 3rem;
            padding: 0rem;
        }
        @media (max-width: 500px) {
            font-size: 3rem;
        }
    }

    .safe {
        font-size: 3.5rem;
        font-family: 'Audiowide', sans-serif;
        margin-left: 2rem;
        @media (max-width: 850px) {
            font-size: 3.2rem;
            padding: 0rem;
        }
        @media (max-width: 476px) {
            font-size: 3rem;
        }
    }

    .for {
        font-family: 'Roboto', sans-serif;
        font-style: italic;
        margin-left: 1.5rem;
        font-size: 2rem;
    }

    .link {
        font-family: Roboto;
        font-size: 2rem;
        margin: 0.5rem;
        padding: 0 10px;
        color: white;
        text-align: center;
        align-items: center;
        height: 2rem;
        &:hover {
            color: ${v.LIGHT_GREEN};
            text-decoration: none;
        }
            @media (max-width: 500px) {
                font-size: 2rem;
                margin: .2rem;
                width: 100%;
            }
        }

`

const LinksWrap = styled.div `
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        @media screen and (max-width: 750px) {
        width: 100%;
        }

        @media (max-width: 500px) {
            flex-direction: column;
        }

        @media (max-width: 385px) {
            width: 100%;
        }
`

const Logo = styled(Link) `
    color: white;
    &:hover {
        color: ${v.LIGHT_GREEN};
        text-decoration: none;
    }
`

const Header = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    return (
        <HeaderContainer>
            <div>
                <Logo to='/'>
                    <div><span className='rfl'>Ride For Life</span><span className='for'>for</span> <span className='safe'>SAFE</span></div>
                </Logo>
            </div>
            <LinksWrap>
              
                <a className='link' href='https://saferidefl.netlify.com/'>About</a>
                {loggedIn && (localStorage.getItem('bfl-token') && decode(localStorage.getItem('bfl-token')).role === 'rider' ? <Link className='link' to='/drivers'>Drivers</Link> : <Link className='link' to='/riders'>Riders</Link>)}
         
                
                {loggedIn && <Link className='link' to='/account'>My Account</Link>}
                {loggedIn && <Link className='link' onClick={() => dispatch(logout())} to='/'>Log Out</Link>}
                {!loggedIn && <Link className='link' to='/register/role'>Register</Link>}
                {!loggedIn && <Link className='link' to='/login'>Log In</Link>}
              
            </LinksWrap>
        </HeaderContainer>

    );
}

export default Header;