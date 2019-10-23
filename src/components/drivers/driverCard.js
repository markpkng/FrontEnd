import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardBody} from 'reactstrap';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeAfrica} from "@fortawesome/free-solid-svg-icons";
import ReactStars from 'react-rating-stars-component';

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
`

const DriverCard = ({driver, ratings}) => {
    const {username, name, location, price, bio, available, driver_id, url} = driver;
    console.log(driver);
    return (
        <StyledCard style={{border: '1px solid white', padding: '1rem', margin: '10px', width: '300px'}}>
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
                </CardBody>
            </Link>
        </StyledCard>
    );
}

export default DriverCard;