import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../header';
import DriverCard from './driverCard';
import {useInput} from '../../hooks/useInput';
import SearchForm from '../searchForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';

const DriverList = () => {
    const [input, setInput, handleInput] = useInput('');
    const [nonAvailable,, handleNonAvailable] = useInput(false);
    const [search, setSearch] = useState('');
    const drivers = useSelector(state => state.drivers);

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