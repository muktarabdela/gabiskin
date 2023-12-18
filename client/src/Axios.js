import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://gabiskin.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axios



