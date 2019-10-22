import axios from 'axios';
import {axiosWithAuth} from '../components/axiosWithAuth';
import * as t from './types';

export const login = (credentials, history) => dispatch => {
    dispatch({type: t.START_REQUEST});
    axios
    .post('https://rideforlife-backend.herokuapp.com/api/auth/login', credentials)
    .then(res => {
        console.log(res);
        localStorage.setItem('bfl-token', res.data.token);
        dispatch({type: t.LOGIN_SUCCESS, payload: res.data.role})
        history.push('/');
    })
    .catch(err => {
        dispatch({type: t.LOGIN_FAIL, payload: err.response.data.message})
        console.log(err.response.data.message);
    });
};

export const logout = () => {
    localStorage.removeItem('bfl-token');
    return {
        type: t.LOGOUT
    };
};

export const register = user => dispatch => {
    console.log(user);
    dispatch({type: t.START_REQUEST});
    axios.post('https://rideforlife-backend.herokuapp.com/api/auth/register', user)
    .then(res => {
        dispatch({type: t.REGISTER_SUCCESS});
        console.log(res);
    })
    .catch(err => {
        dispatch({type: t.REGISTER_FAIL, payload: err.response.data.message});
        console.log(err);
    })
}

export const addReview = review => dispatch => {
    dispatch({type: t.START_REQUEST});
    axiosWithAuth()
    .post('/reviews', review)
    .then(res => {
        dispatch({type: t.ADD_REVIEW_SUCCESS});
        console.log(res);
    })
    .catch(err => {
        dispatch({type: t.ADD_REVIEW_FAIL, payload: err.response.data.message});
        console.log(err);
    })

    console.log(review);
}

export const editReview = (id, review) => dispatch => {
    dispatch({type: t.START_REQUEST});
    axiosWithAuth()
    .put(`/reviews/${id}`, review)
    .then(res => {
        dispatch({type: t.EDIT_REVIEW_SUCCESS});
        console.log(res);
    })
    .catch(err => {
        dispatch({type: t.EDIT_REVIEW_FAIL, payload: err.response.data.message});
        console.log(err);
    })

    console.log(review);
}

export const deleteReview = id => dispatch => {
    console.log(id);
    dispatch({type: t.START_REQUEST});
    axiosWithAuth()
    .delete(`/reviews/${id}`)
    .then(res => {
        console.log(res);
        dispatch({type: t.DELETE_REVIEW_SUCCESS});
    })
    .catch(err => {
        dispatch({type: t.DELETE_REVIEW_FAIL, payload: err.response.data.message});
    })
}

export const deleteRider = id => dispatch => {
    dispatch({type: t.START_REQUEST});
    axiosWithAuth()
    .delete(`/riders/${id}`)
    .then(res => {
        dispatch({type: t.DELETE_RIDER_SUCCESS});
        console.log(res);
        logout();
    })
    .catch(err => {
        dispatch({type: t.DELETE_RIDER_FAIL, payload: err.response.data.message});
        console.log(err);
    })
}

export const deleteDriver = id => dispatch => {
    dispatch({type: t.START_REQUEST});
    axiosWithAuth()
    .delete(`/drivers/${id}`)
    .then(res => {
        dispatch({type: t.DELETE_DRIVER_SUCCESS});
        console.log(res);
        logout();
    })
    .catch(err => {
        dispatch({type: t.DELETE_DRIVER_FAIL, payload: err.response.data.message});
        console.log(err);
    })
}

export const updateDriver = (id, driver) => dispatch => {
    console.log(driver);
    dispatch({type: t.START_REQUEST});
    axiosWithAuth()
    .put(`/drivers/${id}`, driver)
    .then(res => {
        console.log(res);
        dispatch({type: t.UPDATE_DRIVER_SUCCESS});
    })
    .catch(err => {
        console.log(err);
        dispatch({type: t.UPDATE_DRIVER_FAIL, payload: err.response.data.message});
    })
}

export const updateRider = (id, rider) => dispatch => {
    dispatch({type: t.START_REQUEST});
    axiosWithAuth()
    .put(`/riders/${id}`, rider)
    .then(res => {
        console.log(res);
        dispatch({type: t.UPDATE_RIDER_SUCCESS});
    })
    .catch(err => {
        console.log(err);
        dispatch({type: t.UPDATE_RIDER_FAIL, payload: err.response.data.message});
    })
}

export const toggleRegisterModal = () => ({type: t.TOGGLE_REGISTER_MODAL});
