import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {axiosWithAuth} from '../axiosWithAuth';
import ReviewCard from '../reviews/reviewCard';
import ReviewForm from '../reviews/reviewForm';
import styled from 'styled-components';
import {
    START_REQUEST, 
    GET_DRIVER_SUCCESS, 
    GET_DRIVER_FAIL,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL
} from '../../actions/types'; 

const OuterDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #E6E8e5;
    width: 100%;
    border-radius: 5px;
    max-width: 700px;
    padding: 4rem 0;

    .area {
        width: 80%;
    }
`
const Attribute = styled.span `font-weight: bold`;

const DriverProfile = (props) => {
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const [driver, setDriver] = useState({});
    const [reviews, setReviews] = useState([]);
    const {username, name, location, price, bio, available} = driver;

    useEffect(() => {
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
        <OuterDiv>
            <div>
                <h1>Driver Profile</h1>
                <p><Attribute>Username:</Attribute> {username}</p>
                <p><Attribute>Name:</Attribute> {name}</p>
                <p><Attribute>Location:</Attribute> {location}</p>
                <p><Attribute>Price:</Attribute> {price}</p>
                <p><Attribute>Bio:</Attribute> {bio}</p>
                <p><Attribute>Available:</Attribute> {available ? 'Yes!' : 'No'}</p>
                <ReviewForm {...props}/>
                {reviews.length > 0 && <h3>Reviews:</h3>}
                {reviews.map(review => <ReviewCard {...props} key={review.review_id} review={review}/>)}
            </div>
        </OuterDiv>
    );
}

export default DriverProfile;