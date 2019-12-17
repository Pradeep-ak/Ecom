import axios from 'axios'
import localStorageService from '../utils/localStorageService'

export const fetchMenu = () => {
    // const token = localStorageService.getAccessToken();
    //    if (!token) {
    //     axios.post('/api/a/createToken')
    //     .then(res => {
    //         if (res.status === 201) {
    //             localStorageService.setToken(res.data);
    //         }
    //     });
    //    }
    return axios.get('/api/h/menu');
}