import React from 'react';
import {Form, FormGroup, Input, Button, Alert} from 'reactstrap';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 300px;
`
const Submit = {
    margin: '2%',
}

const Warning = {
    fontSize: '20px',
}

const SearchForm = ({input, handleInput, handleSubmit}) => {
    const error = useSelector(state => state.error);
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FlexColumn>
                {error && <Alert color="warning"><h2 style={Warning}>{error}</h2></Alert>}
                <span>Search by location: </span>
                <Input type='text' value={input} placeholder='Location' onChange={e => handleInput(e.target.value)}/>
                <Button style={Submit} type='submit'>Submit</Button>
                </FlexColumn>
            </Form>
        </div>
    );
}

export default SearchForm;