import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfilesActions } from '../../state/actions/profile-action';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

interface Props {}

const Profiles = (props: Props) => {
  const dispatch = useDispatch();

  const profileState = useSelector((state: any) => state.profile);
  const { profiles, isLoading } = profileState;

  useEffect(() => {
    dispatch(getAllProfilesActions());
  }, [dispatch]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with
            developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile: any) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profiles;
