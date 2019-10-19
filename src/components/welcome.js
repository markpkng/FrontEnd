import React from 'react';
import Header from './header';
import {useSelector} from 'react-redux';

const Welcome = () => {
    const role = useSelector(state => state.role);
    return(
        <div>
            <Header/>
            {role ? <h1>Welcome {role}!</h1> : <h1>Welcome!</h1>}
        </div>
    );
}

export default Welcome;