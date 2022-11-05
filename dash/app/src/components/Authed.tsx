import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from '../redux/hooks';
import Chrome from './Chrome';

const Authed: React.FC = () => {
  const isLoggedIn = useSelector((state) => state.auth.admin !== null);
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return (
    <Chrome>
      <Outlet />
    </Chrome>
  );
};

export default Authed;