import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody} from 'reactstrap';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeAfrica} from "@fortawesome/free-solid-svg-icons";
import ReactStars from 'react-rating-stars-component';

const StyledCard = styled(Card) `
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    text-align: left;
    
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
`

const DriverCard = ({driver, ratings}) => {
    const {username, name, location, price, bio, available, driver_id} = driver;

    return (
        <StyledCard style={{border: '1px solid white', padding: '1rem', margin: '10px', width: '300px'}}>
            <Link className='link' to={`drivers/${driver_id}`}>
                <CardHeader>{name}</CardHeader>
                <CardBody>
                    {ratings.length > 0 &&
                    <ReactStars count={5} value={ratings.reduce((acc, cur) => acc + cur)/ratings.length} edit={false} size={50} color2={'#E1BE11'}/>}
                    <p><FontAwesomeIcon icon={faGlobeAfrica}/> {location}</p>
                    <p>Price: {price}</p>
                    <p>Username: {username}</p>
                    <p>Bio: {bio}</p>
                    <p>Available: {available ? 'Yes!' : 'No'}</p>
                </CardBody>
            </Link>
        </StyledCard>
    );
}

export default DriverCard;