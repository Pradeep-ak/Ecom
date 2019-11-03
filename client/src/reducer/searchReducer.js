
export default function searchReducer (state = {searchTerm : "",errors : {}}, action) {
    
    switch(action.type){
        case 'SEARCH_CALL_REQUEST':
                //console.log(action.payload)
                return {searchTerm : "Hello",errors : {}};
        default:
            return state;
    }      
}
