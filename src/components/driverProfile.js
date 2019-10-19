import React from 'react';
import {useSelector} from 'react-redux';
import Header from './header';

const DriverProfile = (props) => {
    const driver = useSelector(state => state.drivers.filter(driver => driver.username === props.match.params.username)[0]);
    const {username, name, location, price, bio, available} = driver;
    return (
        <div>
            <Header/>
            <h1>Driver Profile</h1>
            <p>Username: {username}</p>
            <p>Name: {name}</p>
            <p>Location: {location}</p>
            <p>Price: {price}</p>
            <p>Bio: {bio}</p>
            <p>Available: {available ? 'Yes!' : 'No'}</p>
        </div>
    );
}

export default DriverProfile;