import axios from 'axios';
import {axiosWithAuth} from '../components/axiosWithAuth';

export const START_REQUEST = 'START_REQUEST';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ERROR = 'ERROR';

export const login = credentials => dispatch => {
    dispatch({type: START_REQUEST});
    dispatch({type: LOGIN, payload: 'rider'});
    // axios
    // .post('/api/auth/login', credentials)
    // .then(res => {
    //     localStorage.setItem('token', res);
    //     dispatch({type: LOGIN, payload: credentials.role})
    // })
    // .catch(err => {
    //     dispatch({type: ERROR, payload: err});
    // });
    localStorage.setItem('token', 'test');
    localStorage.setItem('role', 'rider');
};

export const logout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('role', '');
    return {
        type: LOGOUT
    };
};
