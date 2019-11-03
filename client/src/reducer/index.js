import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import searchReducer from './searchReducer'
import categoryReducer from './categoryReducer'
import commonReducer from './commonReducer'

export default combineReducers({
    home: homeReducer,
    search: searchReducer,
    cat: categoryReducer,
    common: commonReducer
});

