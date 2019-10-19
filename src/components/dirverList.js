import React from 'react';
import {useSelector} from 'react-redux';
import Header from './header';
import DriverCard from './driverCard';

const DriverList = () => {
    const drivers = useSelector(state => state.drivers);
    return (
        <div>
            <Header/>
            {drivers.map(driver => <DriverCard key={driver.username} driver={driver}/>)}
        </div>
    );
}

export default DriverList;