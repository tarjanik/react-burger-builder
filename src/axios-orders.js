import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-tarjanik.firebaseio.com/'
});

export default instance;