import React, { useEffect, Fragment } from 'react';
import { getProfileByIdAction } from '../../state/actions/profile-action';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

interface Props {}

const Profile = (props: Props) => {
  const idOBJ = useParams();
  //@ts-ignore
  const id = idOBJ.id;
  const auth = useSelector((state: any) => state.auth);
  const profileState = useSelector((state: any) => state.profile);
  // const { user } = Auth;
  const { profile, isLoading } = profileState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileByIdAction(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {profile === null || isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.isLoading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience: any) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education: any) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}{' '}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
