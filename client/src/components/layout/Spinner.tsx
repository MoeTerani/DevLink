import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';

interface Props {}

const Spinner = (props: Props) => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '30px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;
