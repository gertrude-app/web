import React from 'react';
import { posessive } from '@dash/utils';
import type { ComponentProps } from 'react';
import PageHeading from '../../PageHeading';
import EmptyState from '../../EmptyState';
import ReviewSummaryCard from './DaySummaryCard';

type Props = {
  userName: string;
  days: Array<ComponentProps<typeof ReviewSummaryCard>>;
};

const UserActivityOverviewScreen: React.FC<Props> = ({ userName, days }) => (
  <>
    <PageHeading icon="user" className="mb-4 sm:mb-7">
      {posessive(userName)} Activity
    </PageHeading>
    {days.length > 0 ? (
      <div className="my-8">
        {days.map((day, index) => (
          <ReviewSummaryCard
            key={`${day.date}`}
            {...day}
            index={index}
            numDays={days.length}
          />
        ))}
      </div>
    ) : (
      <EmptyState
        heading={`No activity to review`}
        secondaryText={`No activity has been reported from this user in the past two weeks.`}
        icon={`user`}
        buttonText={`Back to all users`}
        buttonIcon="users"
        action={`/users`}
      />
    )}
  </>
);

export default UserActivityOverviewScreen;
