import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

interface Props {}

const ProfileExperience = ({ experience }: any) => {
  const { company, title, location, to, from, description } = experience;
  return (
    <div>
      <h3 className=''>{company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> -{' '}
        {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
