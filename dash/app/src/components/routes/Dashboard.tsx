import { v4 as uuid } from 'uuid';
import { Loading, ApiErrorMessage } from '@dash/components';
import React from 'react';
import { Dashboard } from '@dash/components';
import { useDispatch, useSelector } from '../../redux/hooks';
import { createKeychainInitiated } from '../../redux/slice-keychains';
import Current from '../../environment';
import { useQuery, Key } from '../../hooks/query';

const DashboardRoute: React.FC = () => {
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.auth.admin?.adminId ?? ``);
  const query = useQuery(Key.dashboard, Current.api.getDashboardWidgets);

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <ApiErrorMessage />;
  }

  return (
    <Dashboard
      {...query.data}
      createKeychain={() => dispatch(createKeychainInitiated({ id: uuid(), adminId }))}
    />
  );
};

export default DashboardRoute;
