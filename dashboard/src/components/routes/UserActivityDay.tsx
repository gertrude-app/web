import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewDay from '@shared/dashboard/Users/Activity/ReviewDay';
import { useDispatch, useSelector } from '../../redux/hooks';
import ApiErrorMessage from '../ApiErrorMessage';
import Loading from '@shared/Loading';
import * as typesafe from '../../lib/typesafe';
import {
  deleteActivityItems,
  fetchActivityDay,
  activityDayKey,
} from '../../redux/slice-users';

const UserActivityDay: React.FC = () => {
  const { userId = ``, date = `` } = useParams<{ userId: string; date: string }>();
  const day = new Date(date);
  const key = activityDayKey(userId, day);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.users.activityDays[key]);

  useEffect(() => {
    dispatch(fetchActivityDay({ userId, day: new Date(date) }));
  }, [dispatch, userId, date]);

  if (!request || request.state === `idle` || request.state === `ongoing`) {
    return <Loading />;
  }

  if (request.state === `failed`) {
    return <ApiErrorMessage error={request.error} />;
  }

  return (
    <ReviewDay
      date={day}
      numDeleted={request.payload.numDeleted}
      deleteItems={(ids) => dispatch(deleteActivityItems(userId, day, ids))}
      items={typesafe.objectValues(request.payload.items).filter((item) => !item.deleted)}
    />
  );
};

export default UserActivityDay;