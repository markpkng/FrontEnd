import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {axiosWithAuth} from '../axiosWithAuth';
import Header from '../header';
import {
    START_REQUEST,
    GET_RIDER_SUCCESS,
    GET_RIDER_FAIL
} from '../../actions/types';

const RiderProfile = ({match}) => {
    const dispatch = useDispatch();
    const [rider, setRider] = useState({});
    const {username, name, location} = rider;
    const {id} = match.params;

    useEffect(() => {
        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get(`/riders/${id}`)
        .then(res => {
            dispatch({type: GET_RIDER_SUCCESS});
            setRider(res.data);
        })
        .catch(err => {
            dispatch({type: GET_RIDER_FAIL, payload: err.response.data.message});
        });
    }, [dispatch, id])

    return(
        <div>
            <h1>Rider Profile:</h1>
            <p>Username: {username}</p>
            <p>Name: {name}</p>
            {location && <p>Location: {location}</p>}
        </div>
    );
}

export default RiderProfile;