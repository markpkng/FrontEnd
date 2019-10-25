import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody} from 'reactstrap';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeAfrica, faUser} from "@fortawesome/free-solid-svg-icons";

const StyledCard = styled(Card) `
    box-shadow: 10px 10px 10px darkgreen;
    text-align: left;
    border: 1px solid white;
    padding: 1rem;
    margin: 1rem;
    max-width: 250px;
    width: 100%;

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
const FA = styled(FontAwesomeIcon) `
    margin-right: 1rem;
`

const RiderCard = ({rider}) => {
    const {username, name, location, rider_id} = rider;
    return (
        <StyledCard className='mButton'>
            <Link className='link' to={`/riders/${rider_id}`}>
                <CardHeader className='mButton'>{name}</CardHeader>
                <CardBody>
                    <p><FA icon={faUser}/>{username}</p>
                    <p><FA icon={faGlobeAfrica}/> {location ? location : <span style={{fontStyle: 'italic'}}>Not Specified</span>}</p>
                </CardBody>
            </Link>
        </StyledCard>
    );
}

export default RiderCard;