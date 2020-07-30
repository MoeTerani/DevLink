import React, { useEffect, Fragment } from 'react';
import {
  getCurrentProfileAction,
  deleteAccount,
} from '../../state/actions/profile-action';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardNavButtons from './DashboardNavButtons';
import Experience from './Experience';
import Education from './Education';

interface Props {}

const Dashboard = (props: Props) => {
  const Auth = useSelector((state: any) => state.auth);
  const profileState = useSelector((state: any) => state.profile);
  const { user } = Auth;
  const { profile, isLoading } = profileState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfileAction());
  }, [dispatch]);

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
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => dispatch(deleteAccount())}
            >
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
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
