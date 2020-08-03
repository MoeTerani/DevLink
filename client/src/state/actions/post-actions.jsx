import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  DELETE_POST,
  UPDATE_POST,
} from '../../state/types';

export const getPostsAction = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
