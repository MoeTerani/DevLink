import { combineReducers } from 'redux';
import alert from './alert-reducer';
import auth from './auth-reducers';
import profile from './profile-reducer';
import post from './post-reducer';

export default combineReducers({ alert, auth, profile, post });
