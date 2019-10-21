import React, {useState, useEffect} from 'react';
import Header from '../header';
import UpdateDriverForm from './updateDriverForm';
import {useDispatch} from 'react-redux';
import {axiosWithAuth} from '../axiosWithAuth';
import {deleteDriver} from '../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    START_REQUEST,
    GET_DRIVER_SUCCESS,
    GET_DRIVER_FAIL
} from '../../actions/types';

const DriverAccount = ({history}) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const deleteAction = () => {
        dispatch(deleteDriver(localStorage.getItem('bfl-id')));
        setModal(!modal);
        history.push('/');
    }

    useEffect(() => {
        dispatch({type: START_REQUEST});
        axiosWithAuth()
        .get(`/drivers/${localStorage.getItem('bfl-id')}`)
        .then(res => {
            console.log(res.data);
            dispatch({type: GET_DRIVER_SUCCESS});
            setUser(res.data);
        })
        .catch(err => {
            console.log(err);
            dispatch({type: GET_DRIVER_FAIL});
        })
    },[]);

    return (
        <div>
            <Header/>
            {user && <div>
                <h1>Driver Account Page</h1>
                <p>Username: {user.username}</p>
                <p>Name: {user.name}</p>
                {user.location && <p>Location: {user.location}</p>}
                <p>Price: {user.price}</p>
                <p> Bio: {user.bio}</p>
                <p>Available: {user.available.toString()}</p>
            </div>}
            {user && <UpdateDriverForm driver={user}/>}
            <div>
                <Button color="danger" onClick={toggle}>Delete Account</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>Are you sure you want to delete your account?</ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={deleteAction}>Yes I am sure</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    );
}

export default DriverAccount;