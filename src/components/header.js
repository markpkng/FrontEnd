import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div `
    display: flex;
    justify-content: space-between;
    margin: 2rem;
`

const Header = () => {
    return (
        <HeaderContainer>
            <Link to='/'><h1>Logo Goes Here</h1></Link>
            <div>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </div>
        </HeaderContainer>

    );
}

export default Header;