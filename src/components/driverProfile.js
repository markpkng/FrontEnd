import React from 'react';
import {useSelector} from 'react-redux';
import Header from './header';
import Review from './review';

const DriverProfile = (props) => {
    const driver = useSelector(state => state.drivers.filter(driver => driver.username === props.match.params.username)[0]);
    const reviews = useSelector(state => state.reviews.filter(review => review.driver_id === driver.id));
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
            {reviews.length > 0 && <h3>Reviews:</h3>}
            {reviews.map(review => <Review review={review}/>)}
        </div>
    );
}

export default DriverProfile;