import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    products: [],
}


export default function productReducers(state=initialState, action) {
    switch(action.type) {
        case types.CREATE_PRODUCT: 
            return {...state, isLoading: true}
        case types.SUCCESS_CREATE_PRODUCT: 
            return {...state, isLoading: false, products: action.payload}      
        case types.FAILURE_CREATE_PRODUCT:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};
        default:
            return state;
    }
}
