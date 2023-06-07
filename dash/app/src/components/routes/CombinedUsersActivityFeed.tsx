import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dateFromUrl } from '@dash/datetime';
import { typesafe } from '@shared/ts-utils';
import { CombinedUsersActivityFeed, ApiErrorMessage, Loading } from '@dash/components';
import React from 'react';
import type { ActivityFeedItem } from '@dash/components';
import { useDispatch, useSelector } from '../../redux/hooks';
import {
  deleteActivityItems,
  fetchCombinedUsersActivityFeed,
} from '../../redux/slice-users';
import { useOptimism, Key, useMutation, useQuery } from '../../hooks/query';
import Current from '../../environment';
import { entireDay } from '../../lib/helpers';
import {
  outputItemToActivityFeedItem,
  prepareActivityDelete,
} from '../../lib/user-activity';

const CombinedUsersActivityFeedRoute: React.FC = () => {
  const { urlDate = `` } = useParams<{ urlDate: string }>();
  const date = dateFromUrl(urlDate);
  const optimistic = useOptimism();
  const queryKey = Key.combinedUsersActivityFeed(urlDate);

  const getActivity = useQuery(queryKey, () =>
    Current.api.combinedUsersActivityFeed({ range: entireDay(date) }),
  );

  if (getActivity.isLoading) {
    return <Loading />;
  }

  if (getActivity.isError) {
    return <ApiErrorMessage error={getActivity.error} />;
  }

  const userChunks = getActivity.data;

  // return <pre>{JSON.stringify(activity, null, 2)}</pre>;
  return (
    <CombinedUsersActivityFeed
      date={date}
      activity={userChunks.reduce<Record<string, ActivityFeedItem[]>>(
        (acc, userChunk) => ({
          ...acc,
          [userChunk.userName]: userChunk.items.map(outputItemToActivityFeedItem),
        }),
        {},
      )}
      numDeleted={0}
      deleteItems={() => {}}
      // deleteItems={(itemRootIds) =>
      //   dispatch(deleteActivityItems({ date: day, itemRootIds }))
      // }
    />
  );

  // const day = dateFromUrl(date);
  // const dispatch = useDispatch();
  // const request = useSelector(
  //   (state) => state.users.fetchCombinedUsersActivityFeed[date],
  // );
  // const allActivity = useSelector((state) => state.users.userActivityFeedDays);

  // useEffect(() => {
  //   if (!request?.state || request?.state === `idle`) {
  //     dispatch(fetchCombinedUsersActivityFeed(day));
  //   }
  // }, [dispatch, day, request?.state]);

  // if (!request || request.state === `idle` || request.state === `ongoing`) {
  //   return <Loading />;
  // }

  // if (request.state === `failed`) {
  //   return <ApiErrorMessage error={request.error} />;
  // }

  // const activity: Record<string, ActivityFeedItem[]> = {};
  // let numDeleted = 0;

  // for (const [activityDayKey, activityRequest] of typesafe.objectEntries(allActivity)) {
  //   if (activityRequest.state !== `succeeded`) {
  //     continue;
  //   }

  //   if (activityDayKey.endsWith(date)) {
  //     const payload = activityRequest.payload;

  //     activity[payload.userName] = typesafe
  //       .objectValues(payload.items)
  //       .filter((item) => !item.deleted);
  //     numDeleted += payload.numDeleted;
  //   }
  // }

  // return (
  //   <CombinedUsersActivityFeed
  //     date={day}
  //     activity={activity}
  //     numDeleted={numDeleted}
  //     deleteItems={(itemRootIds) =>
  //       dispatch(deleteActivityItems({ date: day, itemRootIds }))
  //     }
  //   />
  // );
};

export default CombinedUsersActivityFeedRoute;
