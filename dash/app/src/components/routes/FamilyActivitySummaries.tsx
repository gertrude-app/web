import { ActivitySummaries, ApiErrorMessage, Loading } from '@dash/components';
import React from 'react';
import Current from '../../environment';
import { Key, useQuery } from '../../hooks';

const FamilyActivitySummariesRoute: React.FC = () => {
  const query = useQuery(Key.familyActivitySummaries, () =>
    Current.api.familyActivitySummaries({
      jsTimezoneOffsetMinutes: new Date().getTimezoneOffset(),
    }),
  );

  if (query.isPending) {
    return <Loading />;
  }

  if (query.isError) {
    return <ApiErrorMessage error={query.error} />;
  }

  return (
    <ActivitySummaries
      days={query.data
        .filter((day) => day.numTotal > 0)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map((day, index) => ({
          date: new Date(day.date),
          numItems: day.numTotal,
          numCompleted: day.numApproved + day.numFlagged,
          numFlagged: day.numFlagged,
          index,
          numDays: query.data.length,
        }))}
    />
  );
};

export default FamilyActivitySummariesRoute;
