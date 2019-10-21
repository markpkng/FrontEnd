import * as t from '../actions/types';

export const initialState = {
    loading: false,
    loggedIn: false,
    error: ''
};

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case t.START_REQUEST: return {...state, loading: true}
        case t.LOGIN: return {
            ...state,
            loading: false,
            loggedIn: true
        }
        case t.LOGOUT: return {
            ...state,
            loading: false,
            loggedIn: false,
            role: ''
        }
        case t.REGISTER_SUCCESS: return {...state, loading: false}
        case t.REGISTER_FAIL: return {...state, loading: false}
        case t.GET_DRIVERS_SUCCESS: return {...state, loading: false}
        case t.GET_DRIVERS_FAIL: return {...state, loading: false}
        case t.GET_DRIVER_SUCCESS: return {...state, loading: false}
        case t.GET_DRIVER_FAIL: return {...state, loading: false}
        case t.DELETE_DRIVER_SUCCESS: return {...state, loading: false}
        case t.DELETE_DRIVER_FAIL: return {...state, loading: false}
        case t.GET_REVIEWS_SUCCESS: return {...state, loading: false}
        case t.GET_REVIEWS_FAIL: return {...state, loading: false}
        case t.ADD_REVIEW_SUCCESS: return {...state, loading: false}
        case t.ADD_REVIEW_FAIL: return {...state, loading: false}
        case t.DELETE_REVIEW_SUCCESS: return {...state, loading: false}
        case t.DELETE_REVIEW_FAIL: return {...state, loading: false}
        case t.EDIT_REVIEW_SUCCESS: return {...state, loading: false}
        case t.EDIT_REVIEW_FAIL: return {...state, loading: false}
        case t.GET_RIDERS_SUCCESS: return {...state, loading: false}
        case t.GET_RIDERS_FAIL: return {...state, loading: false}
        case t.GET_RIDER_SUCCESS: return {...state, loading: false}
        case t.GET_RIDER_FAIL: return {...state, loading: false}
        case t.DELETE_RIDER_SUCCESS: return {...state, loading: false}
        case t.DELETE_RIDER_FAIL: return {...state, loading: false}
        default: return {
            ...state
        }
    }
}