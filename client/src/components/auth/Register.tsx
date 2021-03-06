import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../state/actions/alert-action';
import { registerAction } from '../../state/actions/auth-action';

interface Props {}

const Register = (props: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const { name, email, password, password2 } = formData;

  const updateValue = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(registerAction({ name, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={handleSubmit}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            required
            value={name}
            onChange={updateValue}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={updateValue}
          />
          <small className='form-text'>
            This site uses Github's avatar so if you want a profile image, add
            your github username to your profile.
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            //@ts-ignore-start
            minLength='6'
            //@ts-ignore-end
            value={password2}
            onChange={updateValue}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
