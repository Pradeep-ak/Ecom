import axios from 'axios'
import {SEARCH_CALL_REQUEST} from './'


export const SearchSubmitRequest = (searchTerm, history )=> dispatch => {
  axios.get('https://search-api.jcpenney.com/v1/search-service/s?productGridView=medium&activeFacetId=6&disableNER=true&mode=1&searchTerm='+encodeURI(searchTerm)+'&responseType=organic')
 .then(
  dispatch({
    type: SEARCH_CALL_REQUEST,
    payload: {
      searchTerm: searchTerm
    }
    })
 )
 .catch(
  dispatch({
    type: SEARCH_CALL_REQUEST,
    payload: {
     searchTerm: searchTerm
    }
}));    
  // history.push('/d/men');
 };