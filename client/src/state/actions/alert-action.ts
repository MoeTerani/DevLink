import { SET_ALERT } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg: string, alertType: string) => (dispatch: any) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { id, msg, alertType },
  });
};
