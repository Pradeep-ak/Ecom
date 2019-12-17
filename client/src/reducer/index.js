import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import searchReducer from './searchReducer'
import categoryReducer from './categoryReducer'
import commonReducer from './commonReducer'
import productReducer from './productReducer'

export default combineReducers({
    home: homeReducer,
    search: searchReducer,
    cat: categoryReducer,
    common: commonReducer,
    prod: productReducer
});

