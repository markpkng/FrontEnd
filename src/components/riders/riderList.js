import React, {useState, useEffect} from 'react';
import RiderCard from './riderCard';
import SearchForm from '../searchForm';
import {useInput} from '../../hooks/useInput';
import {useDispatch} from 'react-redux';
import {axiosWithAuth} from '../axiosWithAuth';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {
    START_REQUEST,
    GET_RIDERS_SUCCESS,
    GET_RIDERS_FAIL
} from '../../actions/types';

const OuterDiv = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20rem;
    .riders {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    > h1 {
        font-size: 3rem;
    }

    .filter {
        font-size: 1.5rem;
    }
`

const SearchDiv = styled.div `
    width: 90%;
    background: #E6E8e5;
    padding: 1rem;
    margin: 3rem;
    border-radius: 5px;
    max-width: 400px;
    box-shadow: 10px 10px 10px darkgreen;

    h1 {
        font-size: 4rem;
    }
`

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
            dispatch({type: GET_RIDERS_FAIL, payload: err.response.data.message && err.response.data.message});
            console.log(err);
        })

    }, [dispatch])

    const handleSubmit = e => {
        e.preventDefault();
        setSearch(input);
        setInput('');
    }

    return(
        <OuterDiv>
            
            <SearchDiv>
                {search && <span className='filter' onClick={() => setSearch('')}>Filter: {search} <FontAwesomeIcon icon={faTimesCircle}/></span>}
                <SearchForm input={input} handleInput={handleInput} handleSubmit={handleSubmit}/>
            </SearchDiv>
            <h1>Riders currently in need:</h1>
            <div className='center'>
                <div className='riders'>
                    {riders.filter(rider => rider.searching && rider.location.toLowerCase().includes(search.toLowerCase())).map(rider => <RiderCard key={rider.username} rider={rider}/>)}
                </div>
            </div>
        </OuterDiv>
    );
}

export default RiderList;