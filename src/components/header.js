import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/actions';
import {decode} from './decode';

const HeaderContainer = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6vh;
    padding: 4rem;
    background-color: rgba(70, 53, 29, 0.7);
    position: sticky;
	overflow: hidden;
	top: 0;
    z-index: 1;

    .rfl {
        font-family: 'Passion One', sans-serif;
        font-size: 4rem;
        @media (max-width: 730px) {
            font-size: 3rem;
        }
        @media (max-width: 476px) {
            font-size: 2rem;
        }
    }

    .safe {
        font-size: 3.5rem;
        font-family: 'Audiowide', sans-serif;
        margin-left: 2rem;
        @media (max-width: 730px) {
            display: none;
        }
    }

    .for {
        font-family: 'Roboto', sans-serif;
        font-style: italic;
        margin-left: 1.5rem;
        font-size: 2rem;
        @media (max-width: 730px) {
            display: none;
        }
    }

    .link {
        font-family: Roboto;
        font-size: 2rem;
        margin: 0.5rem;
        padding: 0 10px;
        color: white;

        &:hover {
            color: grey;
            text-decoration: none;
        }
            @media (max-width: 440px) {
                font-size: 1.5rem;
            }
        }

`

const Logo = styled(Link) `
    color: white;
    &:hover {
        color: grey;
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
            <div>
                <a className='link' href='https://saferidefl.netlify.com/'>About</a>
                {loggedIn && (localStorage.getItem('bfl-token') && decode(localStorage.getItem('bfl-token')).role === 'rider' ? <Link className='link' to='/drivers'>Drivers</Link> : <Link className='link' to='/riders'>Riders</Link>)}
                {loggedIn && <Link className='link' to='/account'>My Account</Link>}
                {loggedIn && <Link className='link' onClick={() => dispatch(logout())} to='/'>Logout</Link>}
                {!loggedIn && <Link className='link' to='/register/role'>Register</Link>}
                {!loggedIn && <Link className='link' to='/login'>Log In</Link>}
            </div>
        </HeaderContainer>

    );
}

export default Header;