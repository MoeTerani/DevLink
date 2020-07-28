import { PROFILE_ERROR, GET_PROFILE, CLEAR_PROFILE } from '../types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, isLoading: false };

    case PROFILE_ERROR:
      return { ...state, isLoading: false, error: payload };

    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], isLoading: false };
    default:
      return state;
  }
};
