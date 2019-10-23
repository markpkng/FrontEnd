import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import DriverCard from './driverCard';
import {useInput} from '../../hooks/useInput';
import SearchForm from '../searchForm';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {START_REQUEST, 
        GET_DRIVERS_SUCCESS,
        GET_DRIVERS_FAIL,
        GET_REVIEWS_SUCCESS,
        GET_REVIEWS_FAIL} from '../../actions/types';
import { axiosWithAuth } from '../axiosWithAuth';

const layout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const Size = {
    fontSize: '20px',
}

const DriverList = () => {
    const dispatch = useDispatch();
    const [input, setInput, handleInput] = useInput('');
    const [nonAvailable,, handleNonAvailable] = useInput(true);
    const [search, setSearch] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get('https://rideforlife-backend.herokuapp.com/api/drivers')
        .then(res => {
            dispatch({type: GET_DRIVERS_SUCCESS});
            setDrivers(res.data);
        })
        .catch(err => {
            console.log('error', err);
            dispatch({type: GET_DRIVERS_FAIL, payload: err});
        });

        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get('/reviews')
        .then(res => {
            dispatch({type: GET_REVIEWS_SUCCESS});
            setReviews(res.data);
        })
        .catch(err => {dispatch({type: GET_REVIEWS_FAIL, payload: err});}) 
    },[dispatch])

    const handleSubmit = e => {
        e.preventDefault();
        setSearch(input);
        setInput('');
    }

    return (
        <div>
            {search && <span onClick={() => setSearch('')}>Filter: {search} <FontAwesomeIcon icon={faTimesCircle}/></span>}
            <SearchForm input={input} handleInput={handleInput} handleSubmit={handleSubmit}/>
            <label style={Size}>Show non-available drivers? <input type='checkbox' onChange={e => handleNonAvailable(e.target.checked)} checked={nonAvailable}/></label>
            <span style={layout}>{drivers.filter(driver => driver.location.toLowerCase().includes(search.toLowerCase()) && (nonAvailable || driver.available))
                    .map(driver => <DriverCard
                                        key={driver.username}
                                        driver={driver}
                                        ratings={reviews.length > 0 && 
                                                reviews.filter(review => review.driver_id === driver.driver_id)
                                                       .map(review => review.stars)
                                        }                            
            />)}</span>
        </div>
    );
}

export default DriverList;