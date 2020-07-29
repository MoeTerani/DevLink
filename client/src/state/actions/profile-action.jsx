import { setAlert } from './alert-action';
import { GET_PROFILE, PROFILE_ERROR } from '../types';
import axios from 'axios';

// GEt current user profile
export const getCurrentProfileAction = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create or update profiles
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.post('api/profile', formData, config);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard '); // we cannot use >Redirect /> in actions , we need the history object
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
