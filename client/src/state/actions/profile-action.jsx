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
