import React from 'react';
import styled from 'styled-components';

const Type = styled.div `
    border: 1px solid black;
    border-radius: 5px;
    width: 200px;
    padding: 1rem;
    margin: 1rem;

    &:hover{
        opacity: 0.5;
    }
`

const RegisterType = (props) => {
    const handleClick = type => {
        props.setType(type);
        props.history.push(`/register/${type}`)
    }

    return (
        <div>
            <h1>Are you a:</h1>
            <Type onClick={() => handleClick('driver')}>Driver</Type>
            <Type onClick={() => handleClick('rider')}>Rider in need of driver</Type>
        </div>
    );
}

export default RegisterType;