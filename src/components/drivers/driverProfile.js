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
    padding: 4rem;
    box-shadow: 10px 10px 10px darkgreen;

    .area {
        width: 80%;
    }

    .innerContent{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
const P = styled.p `
    font-size: 2rem;
`

const ProfileImg = styled.div`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
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
            <div className='innerContent'>
                <h1>{name}</h1>
                <ProfileImg style={{backgroundImage: `url('${driver.url}')`}}/>
                <P><Attribute>Username:</Attribute> {username}</P>
                <P><Attribute>Location:</Attribute> {location}</P>
                <P><Attribute>Price:</Attribute> {price}</P>
                <P><Attribute>Bio:</Attribute> {bio}</P>
                <P><Attribute>Available:</Attribute> {available ? 'Yes!' : 'No'}</P>
                <ReviewForm {...props}/>
                {reviews.length > 0 && <h1>Reviews:</h1>}
                {reviews.map(review => <ReviewCard {...props} key={review.review_id} review={review}/>)}
            </div>
        </OuterDiv>
    );
}

export default DriverProfile;