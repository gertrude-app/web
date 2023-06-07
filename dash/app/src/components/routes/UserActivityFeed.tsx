import React from 'react';
import { useParams } from 'react-router-dom';
import { dateFromUrl } from '@dash/datetime';
import { ApiErrorMessage, Loading, UserActivityFeed } from '@dash/components';
import { Result } from '@dash/types';
import Current from '../../environment';
import { useQuery, Key, useMutation, useOptimism } from '../../hooks/query';
import { entireDay } from '../../lib/helpers';
import {
  outputItemToActivityFeedItem,
  prepareActivityDelete,
} from '../../lib/user-activity';

const UserActivityFeedRoute: React.FC = () => {
  const { userId = ``, urlDate = `` } = useParams<{ userId: string; urlDate: string }>();
  const date = dateFromUrl(urlDate);
  const optimistic = useOptimism();
  const queryKey = Key.userActivityFeed(userId, urlDate);

  const getActivity = useQuery(queryKey, () =>
    Current.api.userActivityFeed({ userId, range: entireDay(date) }),
  );

  const deleteItems = useMutation(
    `delete:activity-items`,
    (rootIds: UUID[]) => {
      const data = getActivity.data;
      if (!data) return Promise.resolve(Result.unexpectedError(`c86706e8`));
      const [input, nextState] = prepareActivityDelete(rootIds, data);
      optimistic.update(queryKey, nextState);
      return Current.api.deleteActivityItems(input);
    },
    { invalidating: [queryKey, Key.userActivitySummaries(userId)] },
  );

  if (getActivity.isLoading) {
    return <Loading />;
  }

  if (getActivity.isError) {
    return <ApiErrorMessage error={getActivity.error} />;
  }

  const activity = getActivity.data;

  return (
    <UserActivityFeed
      date={date}
      numDeleted={activity.numDeleted}
      deleteItems={(rootIds) => deleteItems.mutate(rootIds)}
      items={activity.items
        .map(outputItemToActivityFeedItem)
        .filter((item) => !item.deleted)}
    />
  );
};

export default UserActivityFeedRoute;
