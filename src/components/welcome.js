import React from 'react';
import Header from './header';
import {decode} from './decode';

const Welcome = () => {
    const role = localStorage.getItem('bfl-token') ? decode(localStorage.getItem('bfl-token')).role : '';
    return(
        <div>
            <Header/>
            {role ? <h1>Welcome {role}!</h1> : <h1>Welcome!</h1>}
        </div>
    );
}

export default Welcome;