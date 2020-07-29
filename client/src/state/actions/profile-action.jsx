import { setAlert } from './alert-action';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from '../types';
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

    history.goBack(); // we cannot use >Redirect /> in actions , we need the history object
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

// ADD EXPERIENCE

export const addExperienceAction = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.put('api/profile/experience', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Added', 'success'));

    history.goBack(); // we cannot use >Redirect /> in actions , we need the history object
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

// ADD EDUCATION
export const addEducationAction = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await axios.put('api/profile/education', formData, config);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Added', 'success'));

    history.goBack(); // we cannot use >Redirect /> in actions , we need the history object
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

// DELETE EXPERIENCE

export const deleteExperienceAction = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete education
export const deleteEducationAction = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
