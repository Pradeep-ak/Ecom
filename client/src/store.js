import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
//import createSagaMiddleware from "redux-saga";

//const initState = {}
const middleware = [thunk]

// create the saga middleware
//const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
// const reduxDevTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const store = createStore(rootReducer, compose(applyMiddleware(...middleware), reduxDevTools))

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))

//store.subscribe(() => console.log('State: ',store.getState()));

export default store;