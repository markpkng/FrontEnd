import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody, Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeAfrica, faMotorcycle} from "@fortawesome/free-solid-svg-icons";
import ReactStars from 'react-rating-stars-component';
import {notifyRider} from '../../actions/actions';
import {useSelector, useDispatch} from 'react-redux';

const StyledCard = styled(Card) `
    box-shadow: 10px 10px 10px darkgreen;
    text-align: left;
    display:
    
    && {
        background: #E6E8E5;
    }

    &:hover {
            opacity: 0.8;
    }

    .link {
        color: #46351D;
        text-decoration: none;
    }

    .header {
        font-size: 2rem;
    }
`

const Attribute = styled.span `
    font-weight: bold;
`

const ProfileImg = styled.div`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin: 0 auto;
`

const ModalButton = styled(Button) `
  && {
    font-size: 2rem;
  }
`

const DriverCard = ({driver, ratings}) => {
    console.log(driver);
    const dispatch = useDispatch();
    const rider = useSelector(state => state.user);
    const {username, name, location, price, bio, available, driver_id, url, phonenumber} = driver;
    const [notifyModal, setNotifyModal] = useState(false);

    const toggleNotifyModal = () => {
        setNotifyModal(!notifyModal);
    }

    const notifyAction = () => {
        setNotifyModal(!notifyModal);
        if(rider){
            dispatch(notifyRider(driver.driver_id, {rider: rider.name, location: rider.location}));
        }
    }

    return (
        <StyledCard className='driverCard' style={{border: '1px solid white', padding: '1rem', margin: '10px', width: '300px'}}>
            <Link className='link' to={`drivers/${driver_id}`}>
                <CardHeader><span className='header'>{name}</span></CardHeader>
                <CardBody>
                    {url && <ProfileImg style={{backgroundImage: `url('${driver.url}')`}}/>}
                    {ratings.length > 0 &&
                    <ReactStars count={5} value={ratings.reduce((acc, cur) => acc + cur)/ratings.length} edit={false} size={50} color2={'#E1BE11'}/>}
                    <p><FontAwesomeIcon icon={faGlobeAfrica}/> {location}</p>
                    <p><Attribute>Price:</Attribute> {price}</p>
                    <p><Attribute>Username:</Attribute> {username}</p>
                    <p><Attribute>Bio:</Attribute> {bio}</p>
                    <p><Attribute>Available:</Attribute> {available ? 'Yes!' : 'No'}</p>
                    {driver.phonenumber && <div onClick={e => e.preventDefault()}>
                        <Button className='mButton' onClick={toggleNotifyModal}>Request Ride <FontAwesomeIcon icon={faMotorcycle} className='fa-1x'/></Button>
                        <Modal className='mStyles' isOpen={notifyModal} toggle={toggleNotifyModal}>
                            <ModalHeader className='mHeader'>
                                <div className='title' toggle={toggleNotifyModal}>Send text to {name}</div>
                            </ModalHeader>
                            <ModalBody>Are you sure you notify this driver you are in need of a ride?</ModalBody>
                            <ModalFooter>
                            <ModalButton className='mButton' color="danger" onClick={notifyAction}>Yes I am sure</ModalButton>{' '}
                            <ModalButton className='mButton' color="secondary" onClick={toggleNotifyModal}>Cancel</ModalButton>
                            </ModalFooter>
                        </Modal>
                    </div>}
                </CardBody>
            </Link>
        </StyledCard>
    );
}

export default DriverCard;