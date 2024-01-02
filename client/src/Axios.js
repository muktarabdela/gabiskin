import Axios from 'axios';

const axios = Axios.create({
    baseURL: ' https://long-jade-basket-clam-toga.cyclic.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axios



