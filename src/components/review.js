import React from 'react';

const Review = ({review}) => {
    const {stars, comment, date, reviewer} = review;
    return (
        <div>
            <p>Stars: {stars}</p>
            <p>Comment: {comment}</p>
            <p>Date: {date}</p>
            <p>Reviewer: {reviewer}</p>
        </div>
    );
}

export default Review;