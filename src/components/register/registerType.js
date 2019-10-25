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
    width: 200px;
    font-family: 'Patua One', serif;
    // color: #9FE09F;
    color: white;
    padding: 0.5rem;
    margin: 1rem;
    font-size: 2.5rem;
    cursor: pointer;

    .role {
        margin: 1rem;
    }

    &:hover{
        // color: #3CDBD3;
        color: #9FE09F;
    }
`

const OuterDiv = styled.div`
    display: flex;
    font-family: 'Passion One', sans-serif;
    align-items: center;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;

    && {
        font-size: 4rem;
    }

    .types {
        display: flex;
        flex-direction: row;

        @media screen and (max-width: 540px) {
            flex-direction: column;
        }
    }
`

const RegisterType = ({setRole, history}) => {
    const error = useSelector(state => state.error);
    const handleClick = role => {
        setRole(role);
        history.push(`/register/${role}`)
    }

    return (
        <OuterDiv>
            {error && <Alert color="warning"><h3>{error}</h3></Alert>}
            <span>Are you a:</span>
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
        </OuterDiv>
    );
}

export default RegisterType;