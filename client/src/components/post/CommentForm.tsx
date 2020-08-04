import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCommentToPostAction } from '../../state/actions/post-actions';

interface Props {}

const CommentForm = ({ postId }: { postId: string }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addCommentToPostAction(postId, { text }));
          setText('');
        }}
      >
        <textarea
          name='text'
          //@ts-ignore
          cols='30'
          //@ts-ignore
          rows='5'
          placeholder='Comment the post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;
