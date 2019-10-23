import React from 'react';
import {Alert} from 'reactstrap';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 500px;

    .loc {
        font-family: 'Roboto', sans-serif;
        font-size: 3rem;
    }
`

const Button = styled.button `
    font-size: 2rem;
`

const Input = styled.input `
    width: 70%;
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
                
                <Button type='submit'>Submit</Button>
                </FlexColumn>
            </form>
        </div>
    );
}

export default SearchForm;