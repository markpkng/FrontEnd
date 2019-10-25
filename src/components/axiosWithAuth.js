import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('bfl-token');

    return axios.create({
        baseURL: 'https://rideforlife-backend.herokuapp.com/api/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });
};