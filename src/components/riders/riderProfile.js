import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {axiosWithAuth} from '../axiosWithAuth';
import styled from 'styled-components';
import {
    START_REQUEST,
    GET_RIDER_SUCCESS,
    GET_RIDER_FAIL
} from '../../actions/types';

const OuterDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #E6E8e5;
    width: 100%;
    border-radius: 5px;
    max-width: 400px;
    padding: 4rem 0;
`

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
        <OuterDiv>
            <div>
                <h1>Rider Profile:</h1>
                <p>Username: {username}</p>
                <p>Name: {name}</p>
                {location && <p>Location: {location}</p>}
            </div>
        </OuterDiv>
    );
}

export default RiderProfile;