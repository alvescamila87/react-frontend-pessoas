import axios from 'axios';

const BASE_URL = 'http://localhost:9000'

const API = axios.create({
    baseURL: BASE_URL
})   

export default API