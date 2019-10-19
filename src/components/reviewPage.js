import React from 'react';
import {useSelector} from 'react-redux';
import Review from './review';
import Header from './header';

const ReviewPage = props => {
    const review = useSelector(state => state.reviews.filter(review => review.id === parseInt(props.match.params.id))[0]);

    return (
        <div>
            <Header/>
            <Review review={review}/>
        </div>
    );
}

export default ReviewPage;