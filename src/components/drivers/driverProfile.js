import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {axiosWithAuth} from '../axiosWithAuth';
import Header from '../header';
import ReviewCard from '../reviews/reviewCard';
import ReviewForm from '../reviews/reviewForm';
import {
    START_REQUEST, 
    GET_DRIVER_SUCCESS, 
    GET_DRIVER_FAIL,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL
} from '../../actions/types'; 

const DriverProfile = (props) => {
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const [driver, setDriver] = useState({});
    const [reviews, setReviews] = useState([]);
    const {username, name, location, price, bio, available} = driver;

    useEffect(() => {
        console.log(id);
        dispatch({type: START_REQUEST});
        //get driver info
        axiosWithAuth()
        .get(`/drivers/${id}`)
        .then(res => {
            dispatch({type: GET_DRIVER_SUCCESS});
            setDriver(res.data);
        })
        .catch(err => {console.log(err)});

        //get driver reviews
        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get(`/drivers/${id}/reviews`)
        .then(res => {
            dispatch({type: GET_REVIEWS_SUCCESS});
            console.log(res.data);
            setReviews(res.data);
        })
        .catch(err => {
            console.log(err);
            dispatch({type: GET_REVIEWS_FAIL});
        })
    }, [dispatch, id]);

    return (
        <div>
            <h1>Driver Profile</h1>
            <p>Username: {username}</p>
            <p>Name: {name}</p>
            <p>Location: {location}</p>
            <p>Price: {price}</p>
            <p>Bio: {bio}</p>
            <p>Available: {available ? 'Yes!' : 'No'}</p>
            <ReviewForm {...props}/>
            {reviews.length > 0 && <h3>Reviews:</h3>}
            {reviews.map(review => <ReviewCard {...props} key={review.review_id} review={review}/>)}
        </div>
    );
}

export default DriverProfile;