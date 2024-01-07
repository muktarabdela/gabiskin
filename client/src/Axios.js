import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://gabiskin.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axios



//https://gabiskin.onrender.com
// http://localhost:5500
// https://long-jade-basket-clam-toga.cyclic.app/