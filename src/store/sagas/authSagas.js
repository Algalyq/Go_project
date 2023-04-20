import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* register({data, navigate}){
    try{
        console.log(data)
        const user = yield axios.post(`${BASE_URL}/auth/signup`, JSON.stringify(data)).then(res => res.data);
        yield put({type:types.RECIEVED_NEW_USER , payload : user})
    }catch(e){
        yield put({type: types.FAILURE_CREATE_USER , errors: e})
    }
}

function* login({data, navigate}){
    try{
        console.log(data)
        const admin_token = yield axios.post(`${BASE_URL}/auth/signin`, JSON.stringify(data)).then(res => res.data);
        console.log(admin_token)
        const expiryDate = new Date(new Date().getTime() + 3600 * 1000);
        if (admin_token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${admin_token.access_token}`;
            localStorage.setItem('token',admin_token.access_token)
            localStorage.setItem("expiryDate", expiryDate.toISOString());
            navigate("../")
        }
        yield put({type:types.SUCCESSFUL_LOGIN_USER, payload : admin_token})
    }catch(e){
        yield put({type: types.FAILURE_LOGIN_USER, errors: e})
    }
}

export function* authSagas(){
    yield all([
        yield takeLatest(types.CREATE_USER, register),
        yield takeLatest(types.LOGIN_USER, login)
    ])
}