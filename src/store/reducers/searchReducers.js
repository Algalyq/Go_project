import * as types from '../actions/types';

const initialState = {
    // isLoading: false,
    list: [],
}


export default function searchReducers(state=initialState, action) {
    switch(action.type) {
        case types.SUCCESS_SEARCH_PRODUCTS: 
            return {...state, list: action.payload};
        case types.FAILURE_SEARCH_PRODUCTS:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
      
        default:
            return state;
    }
}
