import React, { useEffect } from 'react';
import { ApiErrorMessage, Loading, ActivitySummaries } from '@dash/components';
import { typesafe } from '@shared/ts-utils';
import { formatDate } from '@shared/datetime';
import type { ComponentProps } from 'react';
import { useDispatch, useSelector } from '../../redux/hooks';
import { entireDays, fetchCombinedUsersActivitySummaries } from '../../redux/slice-users';
import { useQuery, Key } from '../../hooks/query';
import Current from '../../environment';

const CombinedUsersActivitySummariesRoute: React.FC = () => {
  const getSummaries = useQuery(Key.combinedUsersActivitySummaries, () =>
    Current.api.combinedUsersActivitySummaries(entireDays(14)),
  );

  if (getSummaries.isLoading) {
    return <Loading />;
  }

  if (getSummaries.isError) {
    return <ApiErrorMessage error={getSummaries.error} />;
  }

  const summaries = getSummaries.data;
  return <pre>{JSON.stringify(summaries, null, 2)}</pre>;
  // return <ActivitySummaries days={[...daysMap.values()]} />;
  // return (
  //   <ActivitySummaries
  //     days={summaries
  //       .filter((day) => day.totalItems > 0)
  //       .sort((a, b) => (a.date < b.date ? 1 : -1))
  //       .map((day, index) => ({
  //         date: new Date(day.date),
  //         numItems: day.totalItems,
  //         numCompleted: day.numApproved,
  //         index,
  //         numDays: summaries.days.length,
  //       }))}
  //   />
  // const dispatch = useDispatch();
  // const { request, overviews } = useSelector((state) => ({
  //   request: state.users.fetchCombinedUsersActivitySummaries,
  //   overviews: state.users.userActivitySummaries,
  // }));

  // useEffect(() => {
  //   if (!request?.state || request?.state === `idle`) {
  //     dispatch(fetchCombinedUsersActivitySummaries({}));
  //   }
  // }, [dispatch, request?.state]);

  // if (!request || request.state === `idle` || request.state === `ongoing`) {
  //   return <Loading />;
  // }

  // if (request.state === `failed`) {
  //   return <ApiErrorMessage error={request.error} />;
  // }

  // const daysMap = new Map<string, ComponentProps<typeof ActivitySummaries>['days'][0]>();

  // for (const req of typesafe.objectValues(overviews)) {
  //   if (req.state !== `succeeded`) {
  //     continue;
  //   }

  //   let index = 0;
  //   for (const day of req.payload.days) {
  //     const dayKey = formatDate(new Date(day.date), `url`);
  //     const existing = daysMap.get(dayKey);
  //     if (!existing) {
  //       daysMap.set(dayKey, {
  //         date: new Date(day.date),
  //         numItems: day.totalItems,
  //         numCompleted: day.numApproved,
  //         numDays: req.payload.days.length,
  //         index: index++,
  //       });
  //     } else {
  //       existing.numItems += day.totalItems;
  //       existing.numCompleted += day.numApproved;
  //     }
  //   }
  // }

  // return <ActivitySummaries days={[...daysMap.values()]} />;
};

export default CombinedUsersActivitySummariesRoute;
