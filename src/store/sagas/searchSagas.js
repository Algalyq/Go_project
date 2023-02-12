import {all , put , takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import axios from 'axios'
import {BASE_URL} from '../../config/baseurl';

function* searchProducts({data}){
    try{
        const products = yield axios.get(`${BASE_URL}/products/search/`, data).then(res => res.data);
        console.log(products)
        yield put({type:types.SUCCESS_SEARCH_PRODUCTS , payload : products})
    }catch(e){
        yield put({type: types.FAILURE_SEARCH_PRODUCTS , errors: e})
    }
}


export function* searchSagas(){
    yield all([
        yield takeLatest(types.SEARCH_PRODUCTS, searchProducts),
    ])
}