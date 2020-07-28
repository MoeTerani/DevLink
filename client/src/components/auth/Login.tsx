import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../state/actions/auth-action';

interface Props {}

const Login = (props: Props) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const [logIn, setLogIn] = useState({
    email: '',
    password: '',
  });

  const { email, password } = logIn;

  const updateValue = (e: any) =>
    setLogIn({ ...logIn, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(loginAction({ email, password }));
    } catch (error) {}
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={handleSubmit}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={updateValue}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            //@ts-ignore-start
            minLength='6'
            //@ts-ignore-end
            value={password}
            onChange={updateValue}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
