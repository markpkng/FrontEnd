import React from 'react';
import {Link} from 'react-router-dom';

const RiderCard = ({rider}) => {
    const {username, name, location, rider_id} = rider;
    return (
        <div style={{border: '1px solid black', padding: '1rem', width: '300px'}}>
            <Link to={`/riders/${rider_id}`}>
                <p>Username: {username}</p>
                <p>Name: {name}</p>
                {location && <p>Location: {location}</p>}
            </Link>
        </div>
    );
}

export default RiderCard;