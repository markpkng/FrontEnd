import {
    START_REQUEST,
    LOGIN,
    LOGOUT
} from '../actions/actions';

export const initialState = {
    loading: false,
    loggedIn: false,
    drivers: [
        {
            username: 'testdriver1',
            name: 'Test Driver 1',
            location: 'Test City',
            price: 5,
            bio: 'Hi my name is Test Driver 1 and I am a driver.',
            available: true
        },
        {
            username: 'testdriver2',
            name: 'Test Driver 2',
            location: 'Test Town',
            price: 10,
            bio: 'Hi my name is Test Driver 2 and I am a driver.',
            available: true
        },
        {
            username: 'testdriver3',
            name: 'Test Driver 3',
            location: 'Test Land',
            price: 5,
            bio: 'Hi my name is Test Driver 3 and I am a driver.',
            available: false
        }
    ]
};

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case START_REQUEST: return {
            ...state,
            loading: true
        }
        case LOGIN: {
            return {
                ...state,
                loading: false,
                loggedIn: true
            }
        }
        case LOGOUT: return {
            ...state,
            loading: false,
            loggedIn: false
        }
        default:
            return {
                ...state
            }
    }
}