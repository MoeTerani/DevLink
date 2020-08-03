import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {
  addLikeToPostAction,
  deletePostAction,
} from '../../state/actions/post-actions';

interface Props {
  post: any;
}

const PostItem = (props: Props) => {
  const dispatch = useDispatch();
  const { _id, text, name, avatar, user, likes, comments, date } = props.post;
  const auth = useSelector((state: any) => state.auth);

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {/* {showActions && ( */}
        <Fragment>
          <button
            onClick={() => dispatch(addLikeToPostAction(_id))}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.isLoading && user === auth.user._id && (
            <button
              onClick={() => dispatch(deletePostAction(_id))}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
        {/* )} */}
      </div>
    </div>
  );
};

export default PostItem;
