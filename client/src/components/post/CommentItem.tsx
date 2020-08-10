import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { deleteCommentAction } from '../../state/actions/post-actions';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const CommentItem = ({ comment, postId }: { comment: any; postId: string }) => {
  const { _id, text, name, avatar, user, date } = comment;
  console.log({ comment });
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  console.log({ auth });
  console.log({ postId });
  return (
    <div className='post bg-light p-1 my-1'>
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
        {!auth.isLoading && user === auth.user._id && (
          <button
            onClick={() => dispatch(deleteCommentAction(postId, _id))}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
