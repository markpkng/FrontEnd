import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../header';

const RiderProfile = props => {
    const rider = useSelector(state => state.riders.filter(rider => rider.username === props.match.params.username)[0]);
    const {username, name, location} = rider;
    return(
        <div>
            <Header/>
            <p>Username: {username}</p>
            <p>Name: {name}</p>
            <p>Location: {location}</p>
        </div>
    );
}

export default RiderProfile;