import * as types from '../actions/types';

const initialState = {
    // isLoading: false,
    products: [],
    isLoading: false
}


export default function filterReducers(state=initialState, action) {
    switch(action.type) {
        case types.SUCCESS_FILTER_PRODUCTS: 
            return {...state, products: action.payload};
        case types.FAILURE_FILTER_PRODUCTS:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
      
        default:
            return state;
    }
}
