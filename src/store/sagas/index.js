import {all} from 'redux-saga/effects';
import { authSagas } from './authSagas';
import { searchSagas } from './searchSagas';


export default function* rootSaga(){
    yield all([
        authSagas(),
        searchSagas()
    ])
}