import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import { updateRider } from '../../actions/actions';
import {decode} from '../decode';
import styled from 'styled-components';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`

const UpdateRiderForm = ({rider}) => {
    const dispatch = useDispatch();
    const [password, setPassword, handlePassword] = useInput('');
    const [name, setName, handleName] = useInput(rider.name);
    const [location, setLocation, handleLocation] = useInput(rider.location || '');
    const [newPassword, setNewPassword, handleNewPassword] = useInput('');
    const [searching, setSearching] = useInput(rider.searching);

    const handleSubmit = e => {
        e.preventDefault();
        const id = decode(localStorage.getItem('bfl-token')).subject;
        const rider = {password, name, location, searching: searching.toString()};
        dispatch(updateRider(id, newPassword ? {...rider, newPassword} : rider));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FlexColumn>
                    <h2>Edit Your Account</h2>
                    <input type='text' value={name} placeholder='Name' onChange={e => handleName(e.target.value)} required/>
                    <input type='text' value={location} placeholder='Location' onChange={e => handleLocation(e.target.value)} required/>
                    <label>Searching: <input type='checkbox' checked={searching} onChange={() => setSearching(!searching)}/></label>
                    <input type='password' placeholder='Current Password' onChange={e => handlePassword(e.target.value)} required/>
                    <input type='password' placeholder='New Password' onChange={e => handleNewPassword(e.target.value)}/>
                    <button type='submit'>Submit</button>
                </FlexColumn>
            </form>
        </div>
    );
}

export default UpdateRiderForm;