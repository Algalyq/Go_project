import {combineReducers} from 'redux';

import usersReducers from './authReducer';
import searchReducers from './searchReducers';
import filterReducers from './filterReducers';
import commentReducers from './commentReducers';
import productReducers from './productReducers';

export default combineReducers({
    usersReducers,
    searchReducers,
    filterReducers,
    commentReducers,
    productReducers,
})