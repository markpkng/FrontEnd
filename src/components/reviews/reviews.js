import React from 'react';
import {useSelector} from 'react-redux';
import ReviewCard from './reviewCard';
import Header from '../header';

const Reviews = () => {
    const reviews = useSelector(state => state.reviews);
    return (
        <div>
            <Header/>
            {reviews.map(review => <ReviewCard key={review.id} review={review}/>)}
        </div>
    );
}

export default Reviews;