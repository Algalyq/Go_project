import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* register({data, navigate}){
    try{
        console.log(data)
        const user = yield axios.post(`${BASE_URL}/register`, JSON.stringify(data)).then(res => res.data);
        yield put({type:types.RECIEVED_NEW_USER , payload : user})
    }catch(e){
        yield put({type: types.FAILURE_CREATE_USER , errors: e})
    }
}

export function* authSagas(){
    yield all([
        yield takeLatest(types.CREATE_USER, register),
    ])
}