import React, {useState, useEffect} from 'react';
import Header from '../header';
import RiderCard from './riderCard';
import SearchForm from '../searchForm';
import {useInput} from '../../hooks/useInput';
import {useDispatch} from 'react-redux';
import {axiosWithAuth} from '../axiosWithAuth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {
    START_REQUEST,
    GET_RIDERS_SUCCESS,
    GET_RIDERS_FAIL
} from '../../actions/types';

const RiderList = () => {
    const dispatch = useDispatch();
    const [input, setInput, handleInput] = useInput('');
    const [search, setSearch] = useState('');
    const [riders, setRiders] = useState([]);

    useEffect(() => {
        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get('/riders')
        .then(res => {
            dispatch({type: GET_RIDERS_SUCCESS});
            setRiders(res.data);
        })
        .catch(err => {
            dispatch({type: GET_RIDERS_FAIL});
            console.log(err);
        })

    }, [dispatch])

    const handleSubmit = e => {
        e.preventDefault();
        setSearch(input);
        setInput('');
    }

    return(
        <div>
            <Header/>
            <h1>Riders currently in need:</h1>
            {search && <span onClick={() => setSearch('')}>Filter: {search} <FontAwesomeIcon icon={faTimesCircle}/></span>}
            <SearchForm input={input} handleInput={handleInput} handleSubmit={handleSubmit}/>
            {riders.filter(rider => rider.searching && rider.location.toLowerCase().includes(search.toLowerCase())).map(rider => <RiderCard key={rider.username} rider={rider}/>)}
        </div>
    );
}

export default RiderList;