import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dateFromUrl, formatDate } from '@dash/datetime';
import { typesafe } from '@shared/ts-utils';
import {
  ActivityItem,
  AllUsersActivityReviewDay,
  ApiErrorMessage,
  Loading,
  UserActivityReviewDay,
} from '@dash/components';
import { useDispatch, useSelector } from '../../redux/hooks';
import {
  deleteActivityItems,
  fetchActivityDay,
  activityDayKey,
  fetchUsersActivityDay,
  ActivityDay,
} from '../../redux/slice-users';

const UsersActivityDay: React.FC = () => {
  const { date = `` } = useParams<{ date: string }>();
  const day = dateFromUrl(date);
  const key = formatDate(day, `url`);
  // const key = activityDayKey(date, day);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.users.fetchAllUsersDay[date]);
  const allActivity = useSelector((state) => state.users.activityDays);
  const reqState = request?.state;

  useEffect(() => {
    if (!reqState || reqState === `idle`) {
      dispatch(fetchUsersActivityDay(day));
    }
  }, [dispatch, day, reqState]);

  if (!request || request.state === `idle` || request.state === `ongoing`) {
    return <Loading />;
  }

  if (request.state === `failed`) {
    return <ApiErrorMessage error={request.error} />;
  }

  // we have activity data tease it all out
  // check the date out of the key

  const activity: Record<string, ActivityItem[]> = {};
  let numDeleted = 0;
  const props = {
    date: new Date(),
    activity,
    numDeleted: 0,
    deleteItems: () => {},
  };

  for (const [activityDayKey, activityRequest] of typesafe.objectEntries(allActivity)) {
    if (
      !activityRequest ||
      activityRequest.state === `idle` ||
      activityRequest.state === `ongoing`
    ) {
      continue;
    }

    if (activityRequest.state === `failed`) {
      continue;
    }

    if (activityDayKey.endsWith(key)) {
      const payload = activityRequest.payload;
      const items: ActivityItem[] = [];

      // props.date = payload.items;
      // activity[payload.userName] = payload.items;

      // activity[key].push(activityRequest.payload.items);
      console.log('pay:', JSON.stringify(payload, null, 2));
      const foo = payload.items;
      for (const item of typesafe.objectValues(payload.items)) {
        items.push(item);
      }
      // props.activity;
      console.log(items);
      activity[payload.userName] = items;
      numDeleted += payload.numDeleted;
      // props.activity = payload.items;
    }
    props.activity = activity;
    props.date = day;
    props.numDeleted = numDeleted;
  }

  return <AllUsersActivityReviewDay {...props} />;
  // return <pre>{JSON.stringify(activity, null, 2)}</pre>;
};

export default UsersActivityDay;
