import React, { Fragment } from 'react';
import { deleteEducationAction } from '../../state/actions/profile-action';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch } from 'react-redux';

interface Props {}

const Education = ({ education }: any) => {
  const dispatch = useDispatch();
  const educations = education.map((exp: any) => (
    <tr key={exp._id}>
      <td>{exp.school}</td>
      <td className='hide-sm'>{exp.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{moment.utc(exp.to)}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducationAction(exp._id))}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;
