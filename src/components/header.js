import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/actions';

const HeaderContainer = styled.div `
    display: flex;
    justify-content: space-between;
    margin: 2rem;
`

const StyledLink = styled(Link) `
    margin: 0.5rem;
`

const Header = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    return (
        <HeaderContainer>
            <Link to='/'><h1>Logo Goes Here</h1></Link>
            <div>
                {loggedIn && <StyledLink to='/drivers'>Drivers</StyledLink>}
                {loggedIn && <StyledLink to='/reviews'>Reviews</StyledLink>}
                {loggedIn && <StyledLink onClick={() => dispatch(logout())} to='/'>Logout</StyledLink>}
                {!loggedIn && <StyledLink to='/register/type'>Register</StyledLink>}
                {!loggedIn && <StyledLink to='/login'>Login</StyledLink>}
            </div>
        </HeaderContainer>

    );
}

export default Header;