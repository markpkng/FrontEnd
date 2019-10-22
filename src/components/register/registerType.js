import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {Alert} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAmbulance, faFemale} from "@fortawesome/free-solid-svg-icons";

const Type = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: #46351D;
    border-radius: 5px;
    width: 160px;
    font-family: 'Patua One', serif;
    color: #9FE09F;
    padding: 0.5rem;
    margin: 1rem;

    .role {
        margin: 1rem;
    }

    &:hover{
        color: #3CDBD3;
    }
`

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;

    .types {
        display: flex;
        flex-direction: row;
    }
`

const RegisterType = ({setRole, history}) => {
    const error = useSelector(state => state.error);
    const handleClick = role => {
        setRole(role);
        history.push(`/register/${role}`)
    }

    return (
        <Container>
            {error && <Alert color="warning"><h2>{error}</h2></Alert>}
            <h1>Are you a:</h1>
            <div className='types'>
                <Type onClick={() => handleClick('driver')}>
                    <FontAwesomeIcon className="fa-2x icon" icon={faAmbulance}/>
                    <span className='role'>Driver</span>
                </Type>
                <Type onClick={() => handleClick('rider')}>
                    <FontAwesomeIcon className="fa-2x icon" icon={faFemale}/>
                    <span className='role'>Rider</span>
                </Type>
            </div>
        </Container>
    );
}

export default RegisterType;