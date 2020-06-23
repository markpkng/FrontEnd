import * as t from "../actions/types";

export const initialState = {
    loading: false,
    loggedIn: false,
    registerModal: false,
    user: {},
    error: "",
    reload: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.START_REQUEST:
            return { ...state, loading: true, error: "" };
        case t.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                error: "",
            };
        case t.LOGIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        case t.LOGOUT:
            return {
                ...state,
                loading: false,
                loggedIn: false,
                role: "",
                user: {},
            };
        case t.STORE_RIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                user: action.payload,
                reload: false,
            };
        case t.STORE_RIDER_FAIL:
            return { ...state, loading: false, reload: false };
        case t.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                registerModal: true,
                reload: false,
            };
        case t.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.GET_DRIVERS_SUCCESS:
            return { ...state, loading: false, error: "", reload: false };
        case t.GET_DRIVERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.GET_DRIVER_SUCCESS:
            return { ...state, loading: false, error: "", reload: false };
        case t.GET_DRIVER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.DELETE_DRIVER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                loggedIn: false,
                reload: false,
            };
        case t.DELETE_DRIVER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.UPDATE_DRIVER_SUCCESS:
            return { ...state, loading: false, error: "", reload: true };
        case t.UPDATE_DRIVER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.GET_REVIEWS_SUCCESS:
            return { ...state, loading: false, error: "", reload: false };
        case t.GET_REVIEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.ADD_REVIEW_SUCCESS:
            return { ...state, loading: false, error: "", reload: true };
        case t.ADD_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.DELETE_REVIEW_SUCCESS:
            return { ...state, loading: false, error: "", reload: true };
        case t.DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.EDIT_REVIEW_SUCCESS:
            return { ...state, loading: false, error: "", reload: true };
        case t.EDIT_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.GET_RIDERS_SUCCESS:
            return { ...state, loading: false, error: "", reload: false };
        case t.GET_RIDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.GET_RIDER_SUCCESS:
            return { ...state, loading: false, error: "", reload: false };
        case t.GET_RIDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.DELETE_RIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                loggedIn: false,
                reload: false,
            };
        case t.DELETE_RIDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.UPDATE_RIDER_SUCCESS:
            return { ...state, loading: false, error: "", reload: true };
        case t.UPDATE_RIDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                reload: false,
            };
        case t.TOGGLE_REGISTER_MODAL:
            return { ...state, registerModal: false, reload: false };
        case t.UPDATE_PROFILE_IMAGE_SUCCESS:
            return { ...state, loading: false, reload: false };
        case t.UPDATE_PROFILE_IMAGE_FAIL:
            return { ...state, loading: false, reload: false };
        case t.NOTIFY_DRIVER_SUCCESS:
            return { ...state, loading: false, reload: false };
        case t.NOTIFY_DRIVER_FAIL:
            return { ...state, loading: false, reload: false };
        case t.SHOULD_RELOAD:
            return { ...state, reload: true };
        case t.STOP_RELOAD:
            return { ...state, reload: false };
        default:
            return {
                ...state,
            };
    }
};
