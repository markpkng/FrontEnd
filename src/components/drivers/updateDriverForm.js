import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import { updateDriver } from '../../actions/actions';
import styled from 'styled-components';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`

const UpdateDriverForm = ({driver}) => {
    const dispatch = useDispatch();
    const [password, setPassword, handlePassword] = useInput('');
    const [name, setName, handleName] = useInput(driver.name);
    const [location, setLocation, handleLocation] = useInput(driver.location);
    const [newPassword, setNewPassword, handleNewPassword] = useInput('');
    const [available, setAvailable] = useState(driver.available);
    const [bio, setBio, handleBio] = useInput(driver.bio);
    const [price, setPrice, handlePrice] = useInput(driver.price);

    const handleSubmit = e => {
        e.preventDefault();
        const id = localStorage.getItem('bfl-id');
        const driver = {password, name, location, newPassword, available: available.toString(), price, bio};
        dispatch(updateDriver(id, driver));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FlexColumn>
                    <h2>Edit Your Account</h2>
                    <input type='text' value={name} placeholder='Name' onChange={e => handleName(e.target.value)} required/>
                    <input type='text' value={location} placeholder='Location' onChange={e => handleLocation(e.target.value)} required/>
                    <input type='text' value={bio} placeholder='Bio' onChange={e => handleBio(e.target.value)} required/>
                    <input type='text' value={price} placeholder='Price' onChange={e => handlePrice(e.target.value)} required/>
                    <label>Available: <input type='checkbox' checked={available} onChange={() => setAvailable(!available)}/></label>
                    <input type='password' placeholder='Current Password' onChange={e => handlePassword(e.target.value)} required/>
                    <input type='password' placeholder='New Password' onChange={e => handleNewPassword(e.target.value)}/>
                    <button type='submit'>Submit</button>
                </FlexColumn>
            </form>
        </div>
    );
}

export default UpdateDriverForm;