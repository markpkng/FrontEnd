import React, {useState} from 'react';
import Header from '../header';
import RiderCard from './riderCard';
import SearchForm from '../searchForm';
import {useInput} from '../../hooks/useInput';
import {useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';

const RiderList = () => {
    const [input, setInput, handleInput] = useInput('');
    const [search, setSearch] = useState('');
    const riders = useSelector(state => state.riders);

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