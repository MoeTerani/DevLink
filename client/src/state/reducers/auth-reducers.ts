import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  Register,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: null,
  token: localStorage.getItem('token'),
};

export default (state = initialState, { type, payload }: Register) => {
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: true, isLoading: false };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};
