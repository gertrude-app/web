import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiErrorMessage, Loading, UserActivityOverview } from '@dash/components';
import { useDispatch, useSelector } from '../../redux/hooks';
import { activityDayKey, fetchActivityOverview } from '../../redux/slice-users';
import { Req } from '../../redux/helpers';

const AllUsersActivityOverviewRoute: React.FC = () => {
  // check state.users.fetchallusersday for state
  return null;
};

export default AllUsersActivityOverviewRoute;
