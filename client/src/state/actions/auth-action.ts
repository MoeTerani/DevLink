import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  Register,
  USER_LOADED,
  AUTH_ERROR,
} from '../types';
import axios from 'axios';
import { setAlert } from '../../state/actions/alert-action';

// Load user(Authenticate the user on every endpoint hit)

export const loadUser = () => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get('/api/auth', config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAIL });
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
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((err: any) => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};
