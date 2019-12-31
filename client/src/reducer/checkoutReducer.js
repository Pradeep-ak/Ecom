const initState = {}
export default function checkoutReducer (state = initState, action) {
    switch(action.type){
        case 'ORDER_UPDATED':
            return action.payload;
        default:
            return state;
    }      
}