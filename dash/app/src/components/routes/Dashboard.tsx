import { v4 as uuid } from 'uuid';
import { Loading, ApiErrorMessage } from '@dash/components';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Dashboard } from '@dash/components';
import type { QueryProps } from '../../redux/store';
import { useDispatch, useSelector } from '../../redux/hooks';
import { Req, Query } from '../../redux/helpers';
import { createKeychainInitiated } from '../../redux/slice-keychains';
import Current from '../../environment';

const DashboardRoute: React.FC = () => {
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.auth.admin?.adminId ?? ``);

  const query = useQuery([`dashboard`], async () => {
    const result = await Current.api.getDashboardWidgets();
    return result.valueOrThrow();
  });

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

export const queryProps: QueryProps<typeof Dashboard> = (dispatch) => (state) => {
  const adminId = state.auth.admin?.adminId ?? ``;
  const request = state.dashboard.request;
  if (request.state !== `succeeded`) {
    return [Req.toUnresolvedQuery(request), request.state !== `failed`];
  }
  return [
    Query.resolve({
      ...request.payload,
      createKeychain: () => dispatch(createKeychainInitiated({ id: uuid(), adminId })),
    }),
    false,
  ];
};
