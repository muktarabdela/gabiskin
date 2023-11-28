import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:5500/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axios



// 'https://gabiskin.onrender.com/api',