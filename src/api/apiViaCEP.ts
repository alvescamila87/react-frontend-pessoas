import axios from 'axios';

const BASE_URL = 'https://viacep.com.br/ws'

const APIViaCEP = axios.create({
    baseURL: BASE_URL
})   

export default APIViaCEP