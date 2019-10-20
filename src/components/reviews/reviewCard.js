import React from 'react';

const ReviewCard = ({review}) => {
    const {stars, comment, date, reviewer, id} = review;
    return (
        <div>
            <p>ID: {id}</p>
            <p>Stars: {stars}</p>
            <p>Comment: {comment}</p>
            <p>Date: {date}</p>
            <p>Reviewer: {reviewer}</p>
        </div>
    );
}

export default ReviewCard;