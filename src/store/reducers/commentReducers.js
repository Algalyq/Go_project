import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    comments: [],
}


export default function commentReducers(state=initialState, action) {
    switch(action.type) {
        case types.SUCCESS_GET_COMMENT: 
            return {...state, comments: action.payload};
        case types.FAILURE_GET_COMMENT:
            // alert(JSON.stringify(action.errors))
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;

        case types.CREATE_COMMENT: 
            return {...state, isLoading: true}
        case types.RECIEVED_NEW_COMMENT: 
            return {...state, isLoading: false, comments: [...state.comments, action.payload]}      
        case types.FAILURE_CREATE_COMMENT:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};
      
        default:
            return state;
    }
}
