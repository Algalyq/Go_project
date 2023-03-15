import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import { BASE_URL2 } from '../../config/baseurl2';

function* createComment({data}){
    try{
        const comments = yield axios.post(`${BASE_URL2}/products/comments/`, data, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        yield put({type:types.RECIEVED_NEW_COMMENT, payload : comments})
    }catch(e){
        yield put({type: types.FAILURE_CREATE_COMMENT, errors: e})
    }
}

function* getComment({id}){
    try{
        const comments = yield axios.get(`${BASE_URL2}/products/${id}/comments/`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        yield put({type:types.SUCCESS_GET_COMMENT, payload : comments})
    }catch(e){
        yield put({type: types.FAILURE_GET_COMMENT, errors: e})
    }
}

export function* commentSagas(){
    yield all([
        yield takeLatest(types.CREATE_COMMENT, createComment),
        yield takeLatest(types.GET_COMMENT, getComment)
    ])
}