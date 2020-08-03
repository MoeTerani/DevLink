import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../state/actions/post-actions';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

interface Props {}

const Posts = (props: Props) => {
  const dispatch = useDispatch();
  const PostState = useSelector((state: any) => state.post);
  const { posts, isLoading } = PostState;

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map((post: any) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

export default Posts;
