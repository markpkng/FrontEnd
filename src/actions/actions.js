export const START_REQUEST = 'START_REQUEST';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = credentials => dispatch => {
    dispatch({type: START_REQUEST});
    dispatch({type: LOGIN});
    localStorage.setItem('token', 'test');
};

export const logout = () => {
    localStorage.setItem('token', '');
    return {
        type: LOGOUT
    };
};
