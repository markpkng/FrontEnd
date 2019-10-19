import React from 'react';
import {useSelector} from 'react-redux';
import Header from './header';
import DriverCard from './driverCard';
import {useInput} from '../hooks/useInput';
import SearchForm from './searchForm';

const DriverList = () => {
    const [search, setSearch, handleSearch] = useInput('');
    const drivers = useSelector(state => state.drivers);
    return (
        <div>
            <Header/>
            <SearchForm search={search} handleSearch={handleSearch}/>
            {drivers.filter(driver => driver.location.toLowerCase().includes(search.toLowerCase())).map(driver => <DriverCard key={driver.username} driver={driver}/>)}
        </div>
    );
}

export default DriverList;