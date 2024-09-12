import axios from 'axios';

const BASE_URL = 'http://localhost:9001'

const APIPessoa = axios.create({
    baseURL: BASE_URL
})   

export default APIPessoa