import React from 'react';
import {Link} from 'react-router-dom';

const DriverCard = ({driver}) => {
    const {username, name, location, price, bio, available, driver_id, role} = driver;
    return (
        <div style={{border: '1px solid black', padding: '1rem', width: '300px'}}>
            <Link to={`drivers/${driver_id}`}>
                <p>Username: {username}</p>
                <p>Name: {name}</p>
                <p>Location: {location}</p>
                <p>Price: {price}</p>
                <p>Bio: {bio}</p>
                <p>Available: {available ? 'Yes!' : 'No'}</p>
            </Link>
        </div>
    );
}

export default DriverCard;