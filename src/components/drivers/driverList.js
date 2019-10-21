import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Header from '../header';
import DriverCard from './driverCard';
import {useInput} from '../../hooks/useInput';
import SearchForm from '../searchForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {START_REQUEST, GET_DRIVERS_SUCCESS, GET_DRIVERS_FAIL} from '../../actions/types';
import { axiosWithAuth } from '../axiosWithAuth';

const DriverList = () => {
    const dispatch = useDispatch();
    const [input, setInput, handleInput] = useInput('');
    const [nonAvailable,, handleNonAvailable] = useInput(true);
    const [search, setSearch] = useState('');
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get('https://rideforlife-backend.herokuapp.com/api/drivers')
        .then(res => {
            dispatch({type: GET_DRIVERS_SUCCESS});
            setDrivers(res.data);
            console.log(res.data);
        })
        .catch(err => {
            dispatch({type: GET_DRIVERS_FAIL});
            console.log(err)});
    },[dispatch])

    const handleSubmit = e => {
        e.preventDefault();
        setSearch(input);
        setInput('');
    }

    return (
        <div>
            <Header/>
            {search && <span onClick={() => setSearch('')}>Filter: {search} <FontAwesomeIcon icon={faTimesCircle}/></span>}
            <SearchForm input={input} handleInput={handleInput} handleSubmit={handleSubmit}/>
            <label>Show non-available drivers? <input type='checkbox' onChange={e => handleNonAvailable(e.target.checked)} checked={nonAvailable}/></label>
            {drivers.filter(driver => driver.location.toLowerCase().includes(search.toLowerCase()) && (nonAvailable || driver.available))
                    .map(driver => <DriverCard key={driver.username} driver={driver}/>)}
        </div>
    );
}

export default DriverList;