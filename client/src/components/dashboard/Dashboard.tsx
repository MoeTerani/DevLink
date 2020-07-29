import React, { useEffect, Fragment } from 'react';
import { getCurrentProfileAction } from '../../state/actions/profile-action';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardNavButtons from './DashboardNavButtons';

interface Props {}

const Dashboard = (props: Props) => {
  const Auth = useSelector((state: any) => state.auth);
  const profileState = useSelector((state: any) => state.profile);
  const { isAuthenticated, user } = Auth;
  const { profile, isLoading } = profileState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfileAction());
  }, []);

  return isLoading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardNavButtons />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
