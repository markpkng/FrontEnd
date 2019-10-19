import React from 'react';
import {useSelector} from 'react-redux';
import Review from './review';
import Header from './header';

const Reviews = () => {
    const reviews = useSelector(state => state.reviews);
    return (
        <div>
            <Header/>
            {reviews.map(review => <Review key={review.id} review={review}/>)}
        </div>
    );
}

export default Reviews;