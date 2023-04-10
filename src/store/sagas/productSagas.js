import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import { BASE_URL2 } from '../../config/baseurl2';

function* createProducts({data}){
    try{
        console.log(data)
        const products = yield axios.post(`${BASE_URL2}/products/`, data,  {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data'}}).then(res => res.data);
        console.log(products)
        yield put({type:types.SUCCESS_CREATE_PRODUCT, payload : products})
    }catch(e){
        yield put({type: types.FAILURE_CREATE_PRODUCT, errors: e})
    }
}


export function* productSagas(){
    yield all([
        yield takeLatest(types.CREATE_PRODUCT, createProducts),
    ])
}