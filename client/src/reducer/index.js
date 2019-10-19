import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import searchReducer from './searchReducer'

export default combineReducers({
    home: homeReducer,
    search: searchReducer
});

