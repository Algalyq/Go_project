import * as types from './types';

export function register(data){
    return {type: types.CREATE_USER, data}
}

export function login(data, navigate){
    return {type: types.LOGIN_USER, data, navigate}
}