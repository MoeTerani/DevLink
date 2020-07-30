import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const ProfileItem = ({ profile }: any) => {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  } = profile;

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills
          .slice(0, 4)
          .map((skill: React.ReactNode, index: string | number | undefined) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check' /> {skill}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
