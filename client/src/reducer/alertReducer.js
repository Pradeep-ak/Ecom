const initState = {
    display:true,
    type:'Info',
    alertMsg:''
}
export default function alertReducer (state = initState, action) {
    switch(action.type){
        case 'INFO_ALERT':
            return action.payload;
        default:
            return state;
    }      
}