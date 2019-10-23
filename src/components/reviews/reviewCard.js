import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../axiosWithAuth';
import {useDispatch} from 'react-redux';
import {useInput} from '../../hooks/useInput';
import ReactStars from 'react-rating-stars-component';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
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
    .modalButtons {
        display: flex;

        .modalButton {
            margin: 0.5rem;
        }
    }

    .reviewer {
        font-size: 2rem;
    }
`
const FlexColumn = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Textarea = styled.textarea `
    width: 90%;
    min-height: 100px;
`
const StyledButton = styled.button `
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;
    margin: 2rem;
    border-radius: 5px;
    border: 1px solid green;
`

const Comment = styled.p `
    font-size: 2rem;
`

const ModalButton = styled(Button) `
  && {
    font-size: 2rem;
  }
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
                dispatch({type: GET_RIDER_FAIL, payload: err.response.data.message});
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
            <ReactStars style={{marginTop: 0}}count={5} value={stars} edit={false} size={50} color2={'#E1BE11'}/>
            <p className='reviewer'>By: {anonymous ? 'Anonymous' : reviewerName}</p>
            <p>on {new Date(date).toISOString().substring(0, 10)}</p>
            {comment && <Comment>{comment}</Comment>}
            
            <div className={!deleteModal && !editModal && 'modalButtons'}>
            {/* Delete Review Modal */}
            {rider_id === parseInt(decode(localStorage.getItem('bfl-token')).subject) &&
            <div>
                <StyledButton color="danger" className='modalButton' onClick={toggleDeleteModal}>Delete Review</StyledButton>
                <Modal className='mStyles' isOpen={deleteModal} toggle={toggleDeleteModal}>
                    <ModalHeader className='mHeader'>
                        <div className='title' toggle={toggleDeleteModal}>Delete Review</div>
                    </ModalHeader>
                    <ModalBody>Are you sure you want to delete this review?</ModalBody>
                    <ModalFooter>
                    <ModalButton className='mButton' color="danger" onClick={deleteAction}>Yes I am sure</ModalButton>{' '}
                    <ModalButton className='mButton' color="secondary" onClick={toggleDeleteModal}>Cancel</ModalButton>
                    </ModalFooter>
                </Modal>
            </div>}
            
            {/* Edit Review Modal */}
            {rider_id === parseInt(decode(localStorage.getItem('bfl-token')).subject) &&
            <div>
                <StyledButton color="warning" className='modalButton' onClick={toggleEditModal}>Edit Review</StyledButton>
                    <Modal className='mStyles' isOpen={editModal} toggle={toggleEditModal}>
                        <ModalHeader className='mHeader' toggle={toggleEditModal}>Edit Review</ModalHeader>
                        <ModalBody>
                            <FlexColumn className='mReviewEdit'>
                                <ReactStars half={false} count={5} value={starsInput} onChange={value => setStarsInput(value)} size={50} color2={'#E1BE11'}/>
                                <Textarea value={commentInput} onChange={e => handleCommentInput(e.target.value)} placeholder='Comment'/>
                                <label>Post as anonymous? <input type='checkbox' onChange={() => setAnonymousInput(!anonymousInput)} checked={anonymousInput}/></label>
                            </FlexColumn>
                        </ModalBody>
                        <ModalFooter>
                        <StyledButton color="primary" onClick={handleEdit}>Submit</StyledButton>{' '}
                        <StyledButton color="secondary" onClick={toggleEditModal}>Cancel</StyledButton>
                        </ModalFooter>
                    </Modal>
            </div>}
            </div>
        </ReviewDiv>
    );
}

export default ReviewCard;