import axios from 'axios'
import { CATEGORY_UPDATE_REQUEST } from '.'

export const fetchCategory = path => {
    return axios.get('/api'+path.pathname+path.search);
}
export const updateCategory = (path, history )=> dispatch => {
    console.log('path' + path)
    axios.get('/api'+ path)
    .then(response => {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST,
            payload: response.data
        })
    }).catch(
        console.log('Error in the Search Query.')
        );    
    history.push(path);
    // return axios.get('/api'+path.pathname+path.search);
}
