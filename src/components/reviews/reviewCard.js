import React from 'react';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';

const ReviewDiv = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ReviewCard = ({review}) => {
    const {stars, comment, date, reviewer, id} = review;
    return (
        <ReviewDiv>
            <p>ID: {id}</p>
            <ReactStars count={5} value={stars} edit={false} size={50} color2={'#ffd700'}/>
            <p>Comment: {comment}</p>
            <p>Date: {date}</p>
            <p>Reviewer: {reviewer}</p>
        </ReviewDiv>
    );
}

export default ReviewCard;