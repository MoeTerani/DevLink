import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../state/actions/auth-action';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const NavBar = (props: Props) => {
  const dispatch = useDispatch();

  const Auth = useSelector((state: any) => state.auth);
  const { isAuthenticated, isLoading } = Auth;

  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to='/' onClick={() => dispatch(logout())}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> DevConnector
        </Link>
      </h1>
      {/*  !isLoading ? (do stuff) : NULL   =    !isLoading && (Do stuff( have a ternary )) */}
      {!isLoading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default NavBar;
