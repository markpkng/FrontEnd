const jwtDecode = require('jwt-decode');

export const decode = (token) => jwtDecode(token);