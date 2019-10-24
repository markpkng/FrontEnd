import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {axiosWithAuth} from '../axiosWithAuth';
import {deleteRider} from '../../actions/actions';
import {decode} from '../decode';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UpdateRiderForm from './updateRiderForm';
import {updateRider} from '../../actions/actions';
import styled from 'styled-components';
import {
    START_REQUEST,
    GET_RIDER_SUCCESS,
    GET_RIDER_FAIL
} from '../../actions/types';

const OuterDiv = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #E6E8e5;
    width: 100%;
    border-radius: 5px;
    max-width: 400px;
    padding: 4rem 0;
    align-items: center;
    box-shadow: 10px 10px 10px darkgreen;
`

const RiderAccount = (props) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const deleteAction = () => {
        dispatch(deleteRider(decode(localStorage.getItem('bfl-token')).subject), props.history);
        setModal(!modal);
        props.history.push('/');
    }

    useEffect(() => {
        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get(`/riders/${decode(localStorage.getItem('bfl-token')).subject}`)
        .then(res => {
            console.log(res.data);
            dispatch({type: GET_RIDER_SUCCESS});
            setUser(res.data);
        })
        .catch(err => {
            console.log(err);
            dispatch({type: GET_RIDER_FAIL, payload: err.response.data.message});
        })
    },[updateRider]);

    return (
        <OuterDiv>
            {user && <UpdateRiderForm {...props} updateRider={updateRider} rider={user}/>}
            <div>
                <Button className='mButton' color="danger" onClick={toggle}>Delete Account</Button>
                <Modal className='mStyles' isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Delete Account</ModalHeader>
                    <ModalBody>Are you sure you want to delete your account?</ModalBody>
                    <ModalFooter>
                    <Button className='mButton' color="danger" onClick={deleteAction}>Yes I am sure</Button>{' '}
                    <Button className='mButton' color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </OuterDiv>
    );
}

export default RiderAccount;