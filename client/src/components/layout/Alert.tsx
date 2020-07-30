import React from 'react';
import { useSelector } from 'react-redux';

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
