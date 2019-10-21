import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardTitle, CardHeader, CardBody} from 'reactstrap';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeAfrica} from "@fortawesome/free-solid-svg-icons";

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

const DriverCard = ({driver}) => {
    const {username, name, location, price, bio, available, driver_id, role} = driver;
    return (
        <StyledCard style={{border: '1px solid white', padding: '1rem', margin: '10px', width: '300px'}}>
            <Link className='link' to={`drivers/${driver_id}`}>
                <CardHeader>{name}</CardHeader>
                <CardBody>
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