import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiErrorMessage, Loading, UserActivityOverview } from '@dash/components';
import { useDispatch, useSelector } from '../../redux/hooks';
import {
  activityDayKey,
  fetchActivityOverview,
  fetchUsersActivityDays,
  entireDays,
} from '../../redux/slice-users';
import { Req } from '../../redux/helpers';
import { entireDay } from '../../lib/helpers';
import { typesafe } from '@shared/ts-utils';

const AllUsersActivityOverviewRoute: React.FC = () => {
  // check state.users.fetchallusersday for state
  const dispatch = useDispatch();
  const { request, overviews } = useSelector((state) => ({
    request: state.users.fetchAllActivityOverviews,
    overviews: state.users.activityOverviews,
  }));

  useEffect(() => {
    if (!request?.state || request?.state === `idle`) {
      dispatch(fetchUsersActivityDays(entireDays(14)));
    }
  }, [dispatch, request?.state]);

  if (!request || request.state === `idle` || request.state === `ongoing`) {
    return <Loading />;
  }

  if (request.state === `failed`) {
    return <ApiErrorMessage error={request.error} />;
  }

  const daysMap = new Map<
    string,
    { date: Date; numItems: number; numCompleted: number }
  >();

  for (const [userId, req] of typesafe.objectEntries(overviews)) {
    if (req.state !== `succeeded`) {
      continue;
    }
    for (const day of req.payload.days) {
      let existing = daysMap.get(day.date);
      if (!existing) {
        daysMap.set(day.date, {
          date: new Date(day.date),
          numItems: day.totalItems,
          numCompleted: day.numApproved,
        });
      } else {
        existing.numItems += day.totalItems;
        existing.numCompleted += day.numApproved;
      }
    }
  }

  return <UserActivityOverview days={[...daysMap.values()]} />;
  // return <pre>{JSON.stringify(overviews, null, 2)}</pre>;
};

export default AllUsersActivityOverviewRoute;
