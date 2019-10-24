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

const Div = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5rem;
    padding-bottom: 5rem;
`
const Available = styled.div `
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    margin: 2rem;
    input {
        margin-left: 2rem;
        transform: scale(2)
    }
`
const SearchDiv = styled.div `
    width: 100%;
    background: #E6E8e5;
    padding: 1rem;
    margin-bottom: 3rem;
    border-radius: 5px;
    max-width: 500px;
    box-shadow: 10px 10px 10px darkgreen;

    h1 {
        font-size: 4rem;
    }

    .filter {
        font-size: 1.5rem;
    }
`
const layout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
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
            dispatch({type: GET_DRIVERS_FAIL, payload: err.response.data.message && err.response.data.message});
        });

        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get('/reviews')
        .then(res => {
            dispatch({type: GET_REVIEWS_SUCCESS});
            setReviews(res.data);
        })
        .catch(err => {dispatch({type: GET_REVIEWS_FAIL, payload: err.response.data.message && err.response.data.message});}) 
    },[dispatch])

    const handleSubmit = e => {
        e.preventDefault();
        setSearch(input);
        setInput('');
    }

    return (
        <Div>
            <SearchDiv>
                {search && <span className='filter' onClick={() => setSearch('')}>Filter: {search} <FontAwesomeIcon icon={faTimesCircle}/></span>}
                <SearchForm input={input} handleInput={handleInput} handleSubmit={handleSubmit}/>
                <Available>Show non-available drivers? <input type='checkbox' onChange={e => handleNonAvailable(e.target.checked)} checked={nonAvailable}/></Available>
            </SearchDiv>
            <span style={layout}>{drivers.filter(driver => driver.location.toLowerCase().includes(search.toLowerCase()) && (nonAvailable || driver.available))
                    .map(driver => <DriverCard
                                        key={driver.username}
                                        driver={driver}
                                        ratings={reviews.length > 0 && 
                                                reviews.filter(review => review.driver_id === driver.driver_id)
                                                       .map(review => review.stars)
                                        }                            
            />)}</span>
        </Div>
    );
}

export default DriverList;