import {combineReducers} from 'redux';

import usersReducers from './authReducer';
import searchReducers from './searchReducers';

export default combineReducers({
    usersReducers,
    searchReducers,
})