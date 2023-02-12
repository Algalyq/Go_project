import * as types from '../actions/types';

const initialState = {
    isLoading: false,
    users: [],
    token: {}
}


export default function usersReducers(state=initialState, action) {
    switch(action.type) {
        case types.CREATE_USER: 
            return {...state, isLoading: true}
        case types.RECIEVED_NEW_USER: 
            return {...state, isLoading: false, users: [...state.users, action.payload]}      
        case types.FAILURE_CREATE_USER:
            alert(JSON.stringify(action.errors));
            return {...state, isLoading: false};
        
        case types.LOGIN_USER: 
            return {...state};
        case types.SUCCESSFUL_LOGIN_USER:
            localStorage.setItem('token', action.payload.token);
            return {...state, token: action.payload};
        case types.FAILURE_LOGIN_USER:
            alert("Ведутся технические работы, по пробуйте позже!");
            return state;
        default:
            return state;
    }
}

