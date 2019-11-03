import axios from 'axios'

export const fetchMenu = () => {
    return axios.get('/api/h/menu');
}