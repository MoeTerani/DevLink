import React from 'react';
import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../state/actions/alert-action';

interface Props {}

const Alert = (props: Props) => {
  const alerts = useSelector((state: any) => state.alert);

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert: any) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

export default Alert;
