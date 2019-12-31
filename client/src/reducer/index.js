import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import searchReducer from './searchReducer'
import categoryReducer from './categoryReducer'
import commonReducer from './commonReducer'
import productReducer from './productReducer'
import alertReducer from './alertReducer'
import checkoutReducer from './checkoutReducer'

export default combineReducers({
    home: homeReducer,
    search: searchReducer,
    cat: categoryReducer,
    common: commonReducer,
    prod: productReducer,
    alert:alertReducer,
    checkout:checkoutReducer
});

