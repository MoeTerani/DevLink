import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import { getPostByIdAction } from '../../state/actions/post-actions';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface Props {}

const Post = (props: Props) => {
  const idObj: any = useParams();
  const id = idObj.id;
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state: any) => state.post);

  useEffect(() => {
    dispatch(getPostByIdAction(id));
  }, [dispatch, id]);

  return isLoading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showButtons={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment: any) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default Post;
