import { SET_ALERT, REMOVE_ALERT } from '../types';

const initialState: any = [];

export default (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case SET_ALERT:
      return { ...state, payload };
    case REMOVE_ALERT:
      return state.filter((alert: any) => alert.id !== payload.id);

    default:
      return state;
  }
};
