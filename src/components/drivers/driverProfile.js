import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosWithAuth } from "../axiosWithAuth";
import ReviewCard from "../reviews/reviewCard";
import ReviewForm from "../reviews/reviewForm";
import styled from "styled-components";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMotorcycle} from "@fortawesome/free-solid-svg-icons";
import { notifyRider } from "../../actions/actions";
import {
    START_REQUEST,
    GET_DRIVER_SUCCESS,
    GET_DRIVER_FAIL,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL
} from "../../actions/types";

const OuterDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #e6e8e5;
    width: 100%;
    border-radius: 5px;
    max-width: 700px;
    padding: 4rem;
    box-shadow: 10px 10px 10px darkgreen;

    .area {
        width: 80%;
    }

    .innerContent {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;
const P = styled.p`
    font-size: 2rem;
`;

const ProfileImg = styled.div`
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
`;

const Attribute = styled.span`
    font-weight: bold;
`;

const StyledButton = styled.button`
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
    margin: 2rem;
    border-radius: 5px;
    border: 1px solid green;
`;

const HR = styled.hr `
    width: 100%;
    padding: 0;
    border: 2px solid darkgray;
    border-radius: 5px;
`

const ModalButton = styled(Button)`
    && {
        font-size: 2rem;
    }
`;

const DriverProfile = props => {
    const { id } = props.match.params;
    const dispatch = useDispatch();
    const [driver, setDriver] = useState({});
    const [reviews, setReviews] = useState([]);
    const { username, name, location, price, bio, available } = driver;
    const [notifyModal, setNotifyModal] = useState(false);
    const rider = useSelector(state => state.user);

    const toggleNotifyModal = () => {
        setNotifyModal(!notifyModal);
    };

    const notifyAction = () => {
        setNotifyModal(!notifyModal);
        if (rider) {
            console.log(driver);
            dispatch(
                notifyRider(id, { rider: rider.name, location: rider.location })
            );
        }
    };

    useEffect(() => {
        dispatch({ type: START_REQUEST });
        //get driver info
        axiosWithAuth()
            .get(`/drivers/${id}`)
            .then(res => {
                dispatch({ type: GET_DRIVER_SUCCESS });
                setDriver(res.data);
            })
            .catch(err => {
                dispatch({type: GET_DRIVER_FAIL, payload: err.response.data.message && err.response.data.message})
            });

        //get driver reviews
        dispatch({ type: START_REQUEST });
        axiosWithAuth()
            .get(`/drivers/${id}/reviews`)
            .then(res => {
                dispatch({ type: GET_REVIEWS_SUCCESS });
                console.log(res.data);
                setReviews(res.data);
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: GET_REVIEWS_FAIL, payload: err.response.data.message && err.response.data.message});
            });
    }, [dispatch, id]);

    return (
        <OuterDiv>
            <div className="innerContent">
                <h1>{name}</h1>
                <ProfileImg
                    style={{ backgroundImage: `url('${driver.url}')` }}
                />
                <P>
                    <Attribute>Username:</Attribute> {username}
                </P>
                <P>
                    <Attribute>Location:</Attribute> {location}
                </P>
                <P>
                    <Attribute>Price:</Attribute> {price}
                </P>
                <P>
                    <Attribute>Bio:</Attribute> {bio}
                </P>
                <P>
                    <Attribute>Available:</Attribute>{" "}
                    {available ? "Yes!" : "No"}
                </P>
                
                {driver.phonenumber && (
                    <div onClick={e => e.preventDefault()}>
                        <Button
                            className="mButton"
                            onClick={toggleNotifyModal}
                        >
                            Request Ride <FontAwesomeIcon icon={faMotorcycle} className='fa-1x'/>
                        </Button>
                        <Modal
                            className="mStyles"
                            isOpen={notifyModal}
                            toggle={toggleNotifyModal}
                        >
                            <ModalHeader className="mHeader">
                                <div
                                    className="title"
                                    toggle={toggleNotifyModal}
                                >
                                    Send text to {name}
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                Are you sure you notify this driver you are in
                                need of a ride?
                            </ModalBody>
                            <ModalFooter>
                                <ModalButton
                                    className="mButton"
                                    color="danger"
                                    onClick={notifyAction}
                                >
                                    Yes I am sure
                                </ModalButton>{" "}
                                <ModalButton
                                    className="mButton"
                                    color="secondary"
                                    onClick={toggleNotifyModal}
                                >
                                    Cancel
                                </ModalButton>
                            </ModalFooter>
                        </Modal>
                    </div>
                )}
                <HR/>
                <ReviewForm {...props} />
                <HR/>
                {reviews.length > 0 && <h3>Reviews:</h3>}
                {reviews.map(review => (
                    <ReviewCard
                        {...props}
                        key={review.review_id}
                        review={review}
                    />
                ))}
            </div>
        </OuterDiv>
    );
};

export default DriverProfile;
