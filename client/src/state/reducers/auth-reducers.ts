import { REGISTER_SUCCESS, REGISTER_FAIL, Register } from '../types';

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: null,
  token: localStorage.getItem('token'),
};

export default (state = initialState, { type, payload }: Register) => {
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: true, isLoading: false };

    case REGISTER_FAIL:
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
