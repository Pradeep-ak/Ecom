const initState = {}
export default function alertReducer (state = initState, action) {
    switch(action.type){
        case 'CART_UPDATED':
            return action.payload;
        case 'CART_DETAILS_UPDATED':
            return action.payload;
        case 'ORDER_TRACKING_UPDATED':
            return action.payload;
        default:
            return state;
    }      
}