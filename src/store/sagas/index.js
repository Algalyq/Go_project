import {all} from 'redux-saga/effects';
import { authSagas } from './authSagas';
import { commentSagas } from './commentSagas';
import { filterSagas } from './filterSagas';
import { productSagas } from './productSagas';
import { searchSagas } from './searchSagas';


export default function* rootSaga(){
    yield all([
        authSagas(),
        searchSagas(),
        filterSagas(),
        commentSagas(),
        productSagas()
    ])
}