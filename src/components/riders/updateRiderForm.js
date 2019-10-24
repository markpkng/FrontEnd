import React, {useState} from 'react';
import {Alert} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import {decode} from '../decode';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    h1 {
        font-size: 4rem;
    }

    .cancel {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .edit {
        font-family: 'Roboto', sans-serif;
        font-size: 1.5rem;
        margin-top: 0rem;
        margin-bottom: 2.5rem;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    }
`

const Input = styled.input `
    width: 90%;
    font-size: 1.5rem;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    border: 1px solid green;
`
const Button = styled.button `
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    margin: 2rem;
    width: 100px;
    border-radius: 5px;
    border: 1px solid green;
`

const Available = styled.div `
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 1.5rem; 
    margin: 2rem;
    input {
        margin-left: 2rem;
        transform: scale(2)
    }
`

const FA = styled(FontAwesomeIcon) `
    position: relative;
    margin-right: 1rem;
    bottom: 20px;
    &:hover {
        opacity: 0.5;
    }
    
`

const Attribute = styled.span `
    font-weight: bold;
    font-size: 1.5rem;    
`;

const UpdateRiderForm = ({rider, updateRider}) => {
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
                    {error && <Alert color="warning"><h2>{error}</h2></Alert>}
                    <div className='cancel'>
                        {edit && <FA icon={faTimesCircle} onClick={() => setEdit(false)} className='fa-3x'/>}
                    </div>
                    <h1>Your Account Details:</h1>
                    {!edit && <div className='edit' onClick={() => setEdit(true)}><FontAwesomeIcon icon={faPencilAlt} className='fa-1x'/> Edit Account</div>}
                    {!edit && <p><Attribute>Name: </Attribute>{name}</p>}
                    {edit && <Input type='text' value={name} placeholder='Name' onChange={e => handleName(e.target.value)} required/>}
                 
                    {!edit && <p><Attribute>Location: </Attribute>{location ? location : <span style={{fontStyle: 'italic'}}>Not set yet</span>}</p>}
                    {edit && <Input type='text' value={location} placeholder='Location' onChange={e => handleLocation(e.target.value)}/>}
                    <Available>Searching: <input disabled={!edit} type='checkbox' checked={searching} onChange={() => setSearching(!searching)}/></Available>
                    {edit && <>
                  
                    <Input type='password' placeholder='Current Password' onChange={e => handlePassword(e.target.value)} required/>
                    
                    <Input type='password' placeholder='New Password?' onChange={e => handleNewPassword(e.target.value)}/>
                    <Button type='submit'>Submit</Button></>}
                </FlexColumn>
            </form>
        </div>
    );
}

export default UpdateRiderForm;