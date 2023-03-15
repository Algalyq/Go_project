import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import { BASE_URL2 } from '../../config/baseurl2';

function* filterProducts({data}){
    let products = {};
    try{
        if(data.price__gte !==0 && data.price__lte !== 0){
            products = yield axios.get(`${BASE_URL2}/products/filter/?price__lte=${data.price__lte}&price__gte=${data.price__gte}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        }else{
            products = yield axios.get(`${BASE_URL2}/products/filter/`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => res.data);
        }
        console.log(products)
        yield put({type:types.SUCCESS_FILTER_PRODUCTS, payload : products})
    }catch(e){
        yield put({type: types.FAILURE_FILTER_PRODUCTS, errors: e})
    }
}


export function* filterSagas(){
    yield all([
        yield takeLatest(types.FILTER_PRODUCTS, filterProducts),
    ])
}