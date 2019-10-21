import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../axiosWithAuth';
import {useDispatch} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import ReactStars from 'react-rating-stars-component';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {deleteReview, editReview} from '../../actions/actions';
import {decode} from '../decode';
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
const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`

const ReviewCard = ({review, match, history}) => {
    const dispatch = useDispatch();
    const [reviewerName, setReviewerName] = useState('');
    const {stars, comment, date, review_id, rider_id, anonymous} = review;
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [commentInput, setCommentInput, handleCommentInput] = useInput(comment);
    const [anonymousInput, setAnonymousInput] = useState(anonymous);
    const [starsInput, setStarsInput] = useState(stars);

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    }

    const toggleEditModal = () => {
        setEditModal(!editModal);
    }

    const deleteAction = () => {
        setDeleteModal(!deleteModal);
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

    const handleEdit = e => {
        e.preventDefault();
        const date = new Date().toISOString();
        const driver_id = parseInt(match.params.id);
        const review = {comment: commentInput, stars: starsInput, date, rider_id, anonymous: anonymousInput.toString(), driver_id};
        dispatch(editReview(review_id, review));
        toggleEditModal();
    }

    return (
        <ReviewDiv>
            <p>Posted by: {anonymous ? 'Anonymous' : reviewerName}</p>
            <p>on {new Date(date).toISOString().substring(0, 10)}</p>
            <ReactStars count={5} value={stars} edit={false} size={50} color2={'#ffd700'}/>
            {comment && <p>Comment: {comment}</p>}
            
            {/* Delete Review Modal */}
            {rider_id === parseInt(decode(localStorage.getItem('bfl-token')).subject) &&
            <div>
                <Button color="danger" onClick={toggleDeleteModal}>Delete Review</Button>
                <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
                    <ModalHeader toggle={toggleDeleteModal}>Modal title</ModalHeader>
                    <ModalBody>Are you sure you want to delete this review?</ModalBody>
                    <ModalFooter>
                    <Button color="danger" onClick={deleteAction}>Yes I am sure</Button>{' '}
                    <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>}
            
            {/* Edit Review Modal */}
            {rider_id === parseInt(decode(localStorage.getItem('bfl-token')).subject) &&
            <div>
                <Button color="warning" onClick={toggleEditModal}>Edit Review</Button>
                    <Modal isOpen={editModal} toggle={toggleEditModal}>
                        <ModalHeader toggle={toggleEditModal}>Modal title</ModalHeader>
                        <ModalBody>
                            <FlexColumn>
                                <h2>Edit Review:</h2>
                                <ReactStars half={false} count={5} value={starsInput} onChange={value => setStarsInput(value)} size={50} color2={'#ffd700'}/>
                                <input type='text' value={commentInput} onChange={e => handleCommentInput(e.target.value)} placeholder='Comment'/>
                                <label>Post as anonymous? <input type='checkbox' onChange={() => setAnonymousInput(!anonymousInput)} checked={anonymousInput}/></label>
                            </FlexColumn>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={handleEdit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
            </div>}
        </ReviewDiv>
    );
}

export default ReviewCard;