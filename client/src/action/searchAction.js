import axios from 'axios'
import { SEARCH_CALL_REQUEST } from '.'
import { SEARCH_UPDATE_REQUEST } from '.'
import Utils from '../utils/utils';

export const fetchSearchResults = path => {
  // console.log(path)
  return axios.get('/api'+path.pathname+path.search);
}

export const updateSearch = (path, history )=> dispatch => {
  // console.log('path' + path)
  axios.get('/api'+ path)
  .then(response => {
    if(response.data.REDIRECT_URL != null){
        history.push(response.data.REDIRECT_URL)
    } else{
        dispatch({
            type: SEARCH_UPDATE_REQUEST,
            payload: response.data
        })
    }  
  }).catch((err) => {
    console.log(err);
    console.log('Error in the Search Query.')
  });    
  history.push(path);
  // return axios.get('/api'+path.pathname+path.search);
}