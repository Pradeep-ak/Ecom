import axios from 'axios'
import { SEARCH_CALL_REQUEST } from '.'
import { SEARCH_UPDATE_REQUEST } from '.'

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

export const SearchSubmitRequest = (searchTerm, history )=> dispatch => {
  axios.get('/api/s/'+convertToSlug(searchTerm)+'?s='+searchTerm)
  .then(response => {
      dispatch({
          type: SEARCH_CALL_REQUEST,
          payload: response.data
      })
  }).catch(
      console.log('Error in the Search Query.')
      );    
  history.push('/s?s='+searchTerm);
};

export const fetchSearchResults = path => {
  console.log(path)
  return axios.get('/api'+path.pathname+path.search);
}

export const updateSearch = (path, history )=> dispatch => {
  console.log('path' + path)
  axios.get('/api'+ path)
  .then(response => {
      dispatch({
          type: SEARCH_UPDATE_REQUEST,
          payload: response.data
      })
  }).catch(
      console.log('Error in the Search Query.')
      );    
  history.push(path);
  // return axios.get('/api'+path.pathname+path.search);
}