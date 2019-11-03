import axios from 'axios'
import { HOME_INIT_REQUEST } from './'

export const initalLoad = () => dispatch => {
    axios.get('/api/home')
    .then( res =>
        dispatch({
            type: HOME_INIT_REQUEST,
            payload: res.data
            })
        )
    .catch( err => 
        dispatch({
            type: HOME_INIT_REQUEST,
            payload: {}
        })
    
 );
}