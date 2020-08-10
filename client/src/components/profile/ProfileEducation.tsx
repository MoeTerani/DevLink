import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

interface Props {}

const ProfileEducation = ({ education }: any) => {
  const { school, degree, fieldofstudy, to, from, description } = education;
  return (
    <div>
      <h3 className=''>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> -{' '}
        {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
