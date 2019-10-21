import axios from 'axios';
import {axiosWithAuth} from '../components/axiosWithAuth';
import * as t from './types';

export const login = credentials => dispatch => {
    dispatch({type: t.START_REQUEST});
    console.log(credentials);
    axios
    .post('https://rideforlife-backend.herokuapp.com/api/auth/login', credentials)
    .then(res => {
        console.log(res);
        const id = res.data.rider_id ? res.data.rider_id : res.data.driver_id;
        localStorage.setItem('bfl-token', res.data.token);
        localStorage.setItem('bfl-id', id);
        localStorage.setItem('bfl-role', res.data.role);
        dispatch({type: t.LOGIN, payload: res.data.role})
    })
    .catch(err => {
        console.log(err);
    });
};

export const logout = () => {
    localStorage.removeItem('bfl-token');
    localStorage.removeItem('bfl-id');
    localStorage.removeItem('bfl-role');
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
        dispatch({type: t.REGISTER_FAIL});
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
        dispatch({type: t.ADD_REVIEW_FAIL});
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
        dispatch({type: t.EDIT_REVIEW_FAIL});
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
        dispatch({type: t.DELETE_REVIEW_FAIL});
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
        dispatch({type: t.DELETE_RIDER_FAIL});
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
        dispatch({type: t.DELETE_DRIVER_FAIL});
        console.log(err);
    })
}