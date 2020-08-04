import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  DELETE_POST,
  UPDATE_LIKES,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../../state/types';
import axios from 'axios';
import { setAlert } from './alert-action';
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

// ADD LIKE TO A POST
export const addLikeToPostAction = (postID) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postID}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postID, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE A POST
export const deletePostAction = (postID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postID}`);
    dispatch({
      type: DELETE_POST,
      payload: postID,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// CREATE A POST
export const addPostAction = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { 'content-type': 'application/json' },
    };
    const res = await axios.post(`/api/posts/`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET A POST BY ID
export const getPostByIdAction = (postID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postID}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD A COMMENT TO A POST
export const addCommentToPostAction = (postID, formData) => async (
  dispatch
) => {
  try {
    const config = {
      headers: { 'content-type': 'application/json' },
    };
    const res = await axios.post(
      `/api/posts/comment/${postID}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Post Created Successfully', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// DELETE A COMMENT BY ID
export const deleteCommentAction = (postID, commentID) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postID}/${commentID}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentID,
    });
    dispatch(setAlert('Comment Removed!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
