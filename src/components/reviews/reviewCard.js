import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../axiosWithAuth';
import {useDispatch} from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {deleteReview} from '../../actions/actions';
import styled from 'styled-components';
import {
    START_REQUEST,
    GET_RIDER_SUCCESS,
    GET_RIDER_FAIL
} from '../../actions/types';

const ReviewDiv = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ReviewCard = ({review}) => {
    const dispatch = useDispatch();
    const [reviewerName, setReviewerName] = useState('');
    const {stars, comment, date, review_id, rider_id, anonymous} = review;
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const deleteAction = () => {
        setModal(!modal);
        dispatch(deleteReview(review_id));
    }

    useEffect(() => {
        if(!anonymous){
            dispatch({type: START_REQUEST});
            axiosWithAuth()
            .get(`/riders/${rider_id}`)
            .then(res => {
                dispatch({type: GET_RIDER_SUCCESS});
                setReviewerName(res.data.name);
            })
            .catch(err => {
                dispatch({type: GET_RIDER_FAIL});
                console.log(err);
            })
        }
    }, [dispatch, anonymous, rider_id])

    return (
        <ReviewDiv>
            <p>Posted by: {anonymous ? 'Anonymous' : reviewerName}</p>
            <p>on {new Date(date).toISOString().substring(0, 10)}</p>
            <ReactStars count={5} value={stars} edit={false} size={50} color2={'#ffd700'}/>
            <p>Comment: {comment}</p>
            {/* Delete Review Modal */}
            {rider_id === parseInt(localStorage.getItem('bfl-id')) &&
            <div>
                <Button color="danger" onClick={toggle}>Delete Review</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>Are you sure you want to delete this review?</ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={deleteAction}>Yes I am sure</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>}
        </ReviewDiv>
    );
}

export default ReviewCard;