import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, FormGroup, Input, Button} from 'reactstrap';
import {useInput} from '../../hooks/useInput';
import styled from 'styled-components';
import {addReview} from '../../actions/actions';
import {decode} from '../decode';
import ReactStars from 'react-rating-stars-component';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
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
        <div>
            <Form onSubmit={handleSubmit}>
                <FlexColumn>
                    <h2>Write A Review:</h2>
                    <ReactStars half={false} count={5} value={stars} onChange={value => setStars(value)} size={50} color2={'#E1BE11'}/>
                    <FormGroup>
                    <Input type='text' value={comment} onChange={e => handleComment(e.target.value)} placeholder='Comment'/>
                    </FormGroup>
                    <label>Post as anonymous? <input type='checkbox' onChange={() => setAnonymous(!anonymous)} checked={anonymous}/></label>
                    <Button type='submit'>Submit</Button>
                </FlexColumn>
            </Form>
        </div>  
    );
}

export default ReviewForm;
