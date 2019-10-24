import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import styled from 'styled-components';
import {addReview} from '../../actions/actions';
import {decode} from '../decode';
import ReactStars from 'react-rating-stars-component';

const FlexColumn = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`

const Div = styled.div `
    width: 100%;
`

const Textarea = styled.textarea `
    width: 70%;
    font-size: 1.5rem;
    padding: 0.75rem;
    margin: 0.5rem;
    border-radius: 5px;
    text-align: center;
    border: 1px solid green;
    min-height: 100px;
`

const Anonymous = styled.div `
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;
    margin: 2rem;
    input {
        margin-left: 2rem;
        transform: scale(2)
    }
`
const StyledButton = styled.button `
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;
    margin: 2rem;
    border-radius: 5px;
    border: 1px solid green;
`

const ReviewForm = ({match, edit}) => {
    const dispatch = useDispatch();
    const [comment, setComment, handleComment] = useInput('');
    const [anonymous, setAnonymous] = useState(false);
    const [stars, setStars] = useState(5);
    const driver_id = match.params.id;

    const handleSubmit = e => {
        e.preventDefault();
        const date = new Date().toISOString();
        const rider_id = parseInt(decode(localStorage.getItem('bfl-token')).subject);
        const driver_id = parseInt(match.params.id);
        const review = {comment, stars, date, rider_id, anonymous: anonymous.toString(), driver_id};
        dispatch(addReview(review));
    }

    return (
        <Div>
            <form onSubmit={handleSubmit}>
                <FlexColumn>
                    <h3>Write A Review:</h3>
                    <ReactStars half={false} count={5} value={stars} onChange={value => setStars(value)} size={50} color2={'#E1BE11'}/>   
                    <Textarea type='textarea' value={comment} onChange={e => handleComment(e.target.value)} placeholder='Comment'/>
                    <Anonymous>Post as anonymous? <input type='checkbox' onChange={() => setAnonymous(!anonymous)} checked={anonymous}/></Anonymous>
                    <StyledButton type='submit'>Submit</StyledButton>
                </FlexColumn>
            </form>
        </Div>  
    );
}

export default ReviewForm;
