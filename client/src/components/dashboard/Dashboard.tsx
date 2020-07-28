import React, { useEffect } from 'react';
import { getCurrentProfileAction } from '../../state/actions/profile-action';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const Dashboard = (props: Props) => {
  const Auth = useSelector((state: any) => state.auth);
  const { isAuthenticated, isLoading } = Auth;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfileAction());
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
