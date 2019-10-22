import React, {useState} from 'react';
import {Form, FormGroup, Input, Button, Alert} from 'reactstrap';
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

    .edit {
        &:hover {
            opacity: 0.5;
        }
    }
`
const Submit = {
    margin: '2%',
}

const Warning = {
    fontSize: '20px',
}

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
            <Form onSubmit={handleSubmit}>
                <FlexColumn>
                    {error && <Alert color="warning"><h2 style={Warning}>{error}</h2></Alert>}
                    <h2>Your Account Details</h2>
                    {!edit && <h4 className='edit' onClick={() => setEdit(true)}>Edit <FontAwesomeIcon icon={faPencilAlt} className='fa-1x'/></h4>}
                    <FormGroup>
                    <Input disabled={!edit} type='text' value={name} placeholder='Name' onChange={e => handleName(e.target.value)} required/>
                    </FormGroup>
                    <FormGroup>
                    <Input disabled={!edit} type='text' value={location} placeholder='Location' onChange={e => handleLocation(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                    <label>Searching: <input disabled={!edit} type='checkbox' checked={searching} onChange={() => setSearching(!searching)}/></label>
                    </FormGroup>
                    {edit && <><FormGroup>
                    <Input type='password' placeholder='Current Password' onChange={e => handlePassword(e.target.value)} required/>
                    </FormGroup>
                    <FormGroup>
                    <Input type='password' placeholder='New Password?' onChange={e => handleNewPassword(e.target.value)}/>
                    </FormGroup>
                    <Button style={Submit} type='submit'>Submit</Button></>}
                </FlexColumn>
            </Form>
        </div>
    );
}

export default UpdateRiderForm;