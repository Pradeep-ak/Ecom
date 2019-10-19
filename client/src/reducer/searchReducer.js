
export default function searchReducer (state = {searchTerm : "Test",errors : {}}, action) {
    
    switch(action.type){
        case 'SEARCH_CALL_REQUEST':
                console.log(action.payload)
                return {searchTerm : "Hello",errors : {}};
        default:
            return state;
    }      
}
