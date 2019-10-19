import {
    START_REQUEST,
    LOGIN,
    LOGOUT
} from '../actions/actions';

export const initialState = {
    loading: false,
    loggedIn: false,
    error: '',
    drivers: [
        {
            id: 1,
            username: 'testdriver1',
            name: 'Test Driver 1',
            location: 'Test City',
            price: 5,
            bio: 'Hi my name is Test Driver 1 and I am a driver.',
            available: true
        },
        {
            id: 2,
            username: 'testdriver2',
            name: 'Test Driver 2',
            location: 'Test Town',
            price: 10,
            bio: 'Hi my name is Test Driver 2 and I am a driver.',
            available: true
        },
        {
            id: 3,
            username: 'testdriver3',
            name: 'Test Driver 3',
            location: 'Test Land',
            price: 5,
            bio: 'Hi my name is Test Driver 3 and I am a driver.',
            available: false
        }
    ],
    reviews: [
        {
            stars: 5,
            comment: 'This driver is awesome',
            date: '10-18-2019',
            driver_id: 1,
            reviewer: 'rider1'
        },
        {
            stars: 4,
            comment: 'This driver is great',
            date: '10-17-2019',
            driver_id: 1,
            reviewer: 'rider1'
        },
        {
            stars: 2,
            comment: 'This driver is not the best',
            date: '10-18-2019',
            driver_id: 2,
            reviewer: 'rider2'
        },
        {
            stars: 5,
            comment: 'This driver is awesome',
            date: '10-18-2019',
            driver_id: 2,
            reviewer: 'rider1'
        },
        {
            stars: 4,
            comment: 'This driver is great',
            date: '10-17-2019',
            driver_id: 3,
            reviewer: 'rider1'
        },
        {
            stars: 2,
            comment: 'This driver is not the best',
            date: '10-18-2019',
            driver_id: 3,
            reviewer: 'rider2'
        }
    ],
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