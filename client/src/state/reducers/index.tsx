import { combineReducers } from 'redux';
import alert from './alert-reducer';
import auth from './auth-reducers';

export default combineReducers({ alert, auth });
