import React, { useState } from 'react';
import { addPostAction } from '../../state/actions/post-actions';
import { useDispatch } from 'react-redux';

interface Props {}

const PostForm = (props: Props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPostAction({ text }));
          setText('');
        }}
      >
        <textarea
          name='text'
          //@ts-ignore
          cols='30'
          //@ts-ignore
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default PostForm;
