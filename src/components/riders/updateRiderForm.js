import React, {useState} from 'react';
import {Alert} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import { updateRider } from '../../actions/actions';
import {decode} from '../decode';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    h1 {
        font-size: 4rem;
    }

    .edit {
        font-family: 'Roboto', sans-serif;
        font-size: 2rem;
        &:hover {
            opacity: 0.5;
        }
    }
`
const Submit = {
    margin: '2%',
    fontSize: '20px',
}

const Warning = {
    fontSize: '20px',
}

const Searchbox = {
    fontSize: '20px',
}

const Input = styled.input `
    width: 90%;
    font-size: 1.5rem;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    border: 1px solid green;
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

const UpdateRiderForm = ({rider}) => {
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const [password, setPassword, handlePassword] = useInput('');
    const [name, setName, handleName] = useInput(rider.name);
    const [location, setLocation, handleLocation] = useInput(rider.location || '');
    const [newPassword, setNewPassword, handleNewPassword] = useInput('');
    const [searching, setSearching] = useInput(rider.searching);

    const [edit, setEdit] = useState(false);

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
                    {error && <Alert color="warning"><h2 style={Warning}>{error}</h2></Alert>}
                    <h1>Your Account Details</h1>
                    {!edit && <div className='edit' onClick={() => setEdit(true)}>Edit <FontAwesomeIcon icon={faPencilAlt} className='fa-1x'/></div>}
                 
                    <Input disabled={!edit} style={Searchbox} type='text' value={name} placeholder='Name' onChange={e => handleName(e.target.value)} required/>
                 
                
                    <Input disabled={!edit} style={Searchbox} type='text' value={location} placeholder='Location' onChange={e => handleLocation(e.target.value)}/>
                
                    <Available style={Searchbox}>Searching: <input disabled={!edit} type='checkbox' checked={searching} onChange={() => setSearching(!searching)}/></Available>
                    {edit && <>
                  
                    <Input type='password' style={Searchbox} placeholder='Current Password' onChange={e => handlePassword(e.target.value)} required/>
                    
                    <Input type='password' style={Searchbox} placeholder='New Password?' onChange={e => handleNewPassword(e.target.value)}/>
                    
                    <button style={Submit} type='submit'>Submit</button></>}
                </FlexColumn>
            </form>
        </div>
    );
}

export default UpdateRiderForm;