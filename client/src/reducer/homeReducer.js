import { HOME_INIT_REQUEST } from './../action/'

const initState={

}
export default function(state = initState, action){
    switch( action.type) {
        case HOME_INIT_REQUEST :
            return action.payload;
        default:
            return state;
    }

}