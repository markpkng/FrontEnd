import React, {useState} from 'react';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';

const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`

const ReviewForm = () => {
    const [rating, setRating] = useState(5);
    return (
        <div>
            <form>
                <FlexColumn>
                    <h2>Write A Review:</h2>
                    <ReactStars count={5} value={rating} onChange={value => setRating(value)} size={50} color2={'#ffd700'}/>
                    <input type='text' placeholder='Comment'/>
                    <label>Post as anonymous? <input type='checkbox'/></label>
                    <button type='submit'>Submit</button>
                </FlexColumn>
            </form>
        </div>  
    );
}

export default ReviewForm;