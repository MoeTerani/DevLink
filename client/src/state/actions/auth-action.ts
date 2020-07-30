import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from '../types';
import axios from 'axios';
import { setAlert } from '../../state/actions/alert-action';
import setAuthToken from '../../utils/setAuthToken';

// Load user(Authenticate the user on every endpoint hit)
export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data.user, // this is gonna be the user data minus password in BE.
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Registering a new user
export const registerAction = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// LOGIN
export const loginAction = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

//LOGOUT and CLEAR PROFILE_ERROR
export const logout = () => (dispatch: any) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
