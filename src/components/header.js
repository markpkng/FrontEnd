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
    min-height: 12vh;
    padding: 2rem;
    background: #46351D;
`

const StyledLink = styled(Link) `
    font-family: Audiowide;
    font-size: 1.5rem;
    margin: 0.5rem;
    color: #3CDBD3;

    &:hover {
        color: #9FE09F;
        text-decoration: none;
    }
`

const Logo = styled(Link) `
    font-size: 3rem; 
    font-family: Audiowide;
    color: #3CDBD3;

    &:hover {
        color: #9FE09F;
        text-decoration: none;
    }
`

const Header = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    return (
        <HeaderContainer>
            <Logo to='/'>Ride For Life</Logo>
            <div>
                {loggedIn && (localStorage.getItem('bfl-token') && decode(localStorage.getItem('bfl-token')).role === 'rider' ? <StyledLink to='/drivers'>Drivers</StyledLink> : <StyledLink to='/riders'>Riders</StyledLink>)}
                {loggedIn && <StyledLink to='/account'>My Account</StyledLink>}
                {loggedIn && <StyledLink onClick={() => dispatch(logout())} to='/'>Logout</StyledLink>}
                {!loggedIn && <StyledLink to='/register/role'>Register</StyledLink>}
                {!loggedIn && <StyledLink to='/login'>Login</StyledLink>}
            </div>
        </HeaderContainer>

    );
}

export default Header;