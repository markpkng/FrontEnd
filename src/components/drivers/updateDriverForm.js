import React, {useState, useEffect} from 'react';
import {Alert, Button} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import { updateDriver } from '../../actions/actions';
import {decode} from '../decode';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faUserCircle, faTimesCircle, faCamera} from "@fortawesome/free-solid-svg-icons";
import {updateProfileImage} from '../../actions/actions';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    text-align: center;

    h1 {
        font-size: 4rem;
    }

    .cancel {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .account-details {
        p {
            text-align: left;
        }
    }

    .bio {
        min-width: 80%;
        min-height: 100px;
    }

    .edit {
        font-family: 'Passion One', sans-serif;
        font-size: 2rem;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
        margin-bottom: 1rem;
    }

    .profileIcon {
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
    font-family: 'Roboto', sans-serif;
`

const Textarea = styled.textarea `
    width: 90%;
    font-size: 1.5rem;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    border: 1px solid green;
    font-family: 'Roboto', sans-serif;
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
const ImageInput = styled.input `
    opacity: 0;
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 1px;
`
const DefaultProfile = styled(FontAwesomeIcon) `
    position: absolute;
    width: 200px !important;
    height: 200px;
    border-radius: 50%;
    background: white;
    &:hover {
        border: 3px solid green;
        opacity: 0.2;
    }
`

const ProfileImg = styled.div`
    position: absolute;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    
    &:hover {
        border: 3px solid green;
        opacity: 0.2;
    }
`
const ProfileWrapper = styled.div `
    width: 200px;
    height: 200px;
    margin: 2rem;
`

const ProfileFilter = styled.div `
    cursor: pointer;
    font-family: 'Patua One', sans-serif;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: flex;
    font-size: 3.5rem;
    align-items: center;
    justify-content: center;
    .editPicture {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

`

const Attribute = styled.span `font-weight: bold`;

const FA = styled(FontAwesomeIcon) `
    position: relative;
    // margin-right: 3rem;
    bottom: 20px;
    &:hover {
        opacity: 0.5;
    }
    cursor: pointer;
    // font-size: 2rem;
`

const UpdateDriverForm = ({driver}) => {
    console.log(driver.url);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();
    const [password, setPassword, handlePassword] = useInput('');
    const [name, setName, handleName] = useInput(driver.name);
    const [location, setLocation, handleLocation] = useInput(driver.location);
    const [newPassword, setNewPassword, handleNewPassword] = useInput('');
    const [available, setAvailable] = useState(driver.available);
    const [bio, setBio, handleBio] = useInput(driver.bio);
    const [price, setPrice, handlePrice] = useInput(driver.price);
    const [edit, setEdit] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const id = decode(localStorage.getItem('bfl-token')).subject;
        const driver = {password, name, location, available: available.toString(), price, bio};
        dispatch(updateDriver(id, newPassword ? {...driver, newPassword} : driver));
        setEdit(false);
    }

    useEffect(() => {
        if(profilePicture){
            const formData = new FormData();
            formData.append('image', profilePicture);
            formData.append('image_id', driver.image_id);
            dispatch(updateProfileImage(driver.id, formData));
        }
    }, [profilePicture])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FlexColumn>
                    {error && <Alert color="warning"><h2>{error}</h2></Alert>}
                    <div className='cancel'>
                        {edit && <FA icon={faTimesCircle} onClick={() => setEdit(false)} className='fa-2x'/>}
                    </div>
                    <h1>Your Account Details</h1>
                    <ImageInput type='file' onChange={e => setProfilePicture(e.target.files[0])} id='imageInput'/>
                        <ProfileWrapper>
                            <label htmlFor='imageInput'>{driver.url ? (
                            <ProfileFilter>
                                <div className='editPicture'>
                                    Edit
                                    <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                                </div>
                                <ProfileImg style={{backgroundImage: `url('${driver.url}')`}}/>
                            </ProfileFilter>) : (
                            <ProfileFilter>
                                <div className='editPicture'>
                                    Edit
                                    <FontAwesomeIcon icon={faCamera} className='fa-1x'/>
                                </div>
                                <DefaultProfile icon={faUserCircle}/>
                            </ProfileFilter>)}</label>
                        </ProfileWrapper>

                        <div className='account-details' >
                    {!edit && <div className='edit' onClick={() => setEdit(true)}>Edit <FontAwesomeIcon icon={faPencilAlt} className='fa-1x'/></div>}
                    {!edit && <p><Attribute>Name: </Attribute>{name}</p>}
                    {edit && <Input disabled={!edit} type='text' value={name} placeholder='Name' onChange={e => handleName(e.target.value)} required/>}
                    
                    {!edit && <p><Attribute>Location: </Attribute>{location}</p>}
                    {edit && <Input disabled={!edit} type='text' value={location} placeholder='Location' onChange={e => handleLocation(e.target.value)} required/>}
                    
                    {!edit && <p><Attribute>About: </Attribute>{bio}</p>}
                    {edit && <Textarea disabled={!edit} className='bio' wrap='soft' value={bio} placeholder='Bio' onChange={e => handleBio(e.target.value)} required/>}
                    {!edit && <p><Attribute>Price: </Attribute>{price}</p>}
                    {edit && <Input disabled={!edit} type='text' value={price} placeholder='Price' onChange={e => handlePrice(e.target.value)} required/>}
                    </div>
               
                    <Available><Attribute>Available:</Attribute> <input disabled={!edit} type='checkbox' checked={available} onChange={() => setAvailable(!available)}/></Available>
              
                    {edit && <>
                    <Input type='password' placeholder='Current Password' onChange={e => handlePassword(e.target.value)} required/>
                
                    <Input type='password' placeholder='New Password?' onChange={e => handleNewPassword(e.target.value)}/>
                   
                    <Button className='mButton' type='submit'>Submit</Button></>}
                </FlexColumn>
            </form>
        </div>
    );
}

export default UpdateDriverForm;