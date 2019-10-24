import React from 'react';
import {Alert} from 'reactstrap';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const FlexColumn = styled.div `
    display: flex;
    // flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-top: 10px;
    max-width: 600px;

    .loc {
        font-family: 'Roboto', sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
    }
`
const StyledButton = styled.button `
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    width: 80px;
    margin: 1rem;
    border-radius: 5px;
    border: 1px solid green;
`

const Input = styled.input `
    width: 50%;
    font-size: 1.5rem;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    border: 1px solid green;
`

const SearchForm = ({input, handleInput, handleSubmit}) => {
    const error = useSelector(state => state.error);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FlexColumn>
                {error && <Alert color="warning"><h2>{error}</h2></Alert>}
                <span className='loc'>Search by location: </span>
                
                <Input type='text' value={input} placeholder='Location' onChange={e => handleInput(e.target.value)}/>
                
                <StyledButton type='submit'>Submit</StyledButton>
                </FlexColumn>
            </form>
        </div>
    );
}

export default SearchForm;