import React, { useState, Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  createProfile,
  getCurrentProfileAction,
} from '../../state/actions/profile-action';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const EditProfile = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const profileState = useSelector((state: any) => state.profile);
  const { profile, isLoading } = profileState;
  console.log(profile);
  useEffect(() => {
    dispatch(getCurrentProfileAction());
  }, []);
  useEffect(() => {
    // dispatch(getCurrentProfileAction());
    /* if (!profile) dispatch(getCurrentProfileAction());
    if (isLoading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        //@ts-ignore-start
        if (key in profileData) profileData[key] = profile[key];
        //@ts-ignore-end
      }
      for (const key in profile.socials) {
        //@ts-ignore-start
        if (key in profileData) profileData[key] = profile.socials[key];
      }
      setFormData(profileData);
    } */

    setFormData({
      company: isLoading || !profile.company ? '' : profile.company,
      website: isLoading || !profile.website ? '' : profile.website,
      location: isLoading || !profile.location ? '' : profile.location,
      status: isLoading || !profile.status ? '' : profile.status,
      skills: isLoading || !profile.skills ? '' : profile.skills.join(','),
      githubusername:
        isLoading || !profile.githubusername ? '' : profile.githubusername,
      bio: isLoading || !profile.bio ? '' : profile.bio,
      twitter: isLoading || !profile.social ? '' : profile.social.twitter,
      facebook: isLoading || !profile.social ? '' : profile.social.facebook,
      linkedin: isLoading || !profile.social ? '' : profile.social.linkedin,
      youtube: isLoading || !profile.social ? '' : profile.social.youtube,
      instagram: isLoading || !profile.social ? '' : profile.social.instagram,
    });
  }, [isLoading, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const updateValue = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createProfile(formData, history, true));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <select name='status' value={status} onChange={updateValue}>
            <option>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={updateValue}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={updateValue}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={updateValue}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={updateValue}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={updateValue}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={updateValue}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={updateValue}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={updateValue}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={updateValue}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={updateValue}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={updateValue}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' value='Update' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default EditProfile;
