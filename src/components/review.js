import React from 'react';
import {Link} from 'react-router-dom';

const Review = ({review}) => {
    const {stars, comment, date, reviewer, id} = review;
    return (
        <div>
            <Link to={`/reviews/${id}`}>
                <p>Stars: {stars}</p>
                <p>Comment: {comment}</p>
                <p>Date: {date}</p>
                <p>Reviewer: {reviewer}</p>
            </Link>
        </div>
    );
}

export default Review;