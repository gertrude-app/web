import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components';
import { UndoMainPadding } from '../../Chrome/Chrome';
import PartyMessage from '../../PartyMessage';
import { ActivityItem, deleteableChunks } from './UserActivityReviewDay';
import ReviewDayHeader from './ReviewDayHeader';
import ReviewDayWrapper from './ReviewDayWrapper';
import { posessive } from '@dash/utils';
import UserActivityHeader from './UserActivityHeader';

type UserName = string;

interface Props {
  date: Date;
  activity: Record<UserName, ActivityItem[]>;
  numDeleted: number;
  deleteItems(ids: UUID[]): unknown;
  chunkSize?: number;
}

const AllUsersActivityReviewDay: React.FC<Props> = ({
  date,
  activity,
  numDeleted,
  deleteItems,
  chunkSize = 100,
}) => {
  const navigate = useNavigate();

  const items: ActivityItem[] = [];
  Object.entries(activity).map(([, activityItems]) => items.push(...activityItems));

  return (
    <UndoMainPadding>
      <ReviewDayHeader date={date} numItems={items.length} numDeleted={numDeleted} />
      {items.length > 0 ? (
        <ReviewDayWrapper>
          {Object.entries(activity).map(([userName, items]) => (
            <>
              <UserActivityHeader>{userName}</UserActivityHeader>
              {deleteableChunks(items, chunkSize, deleteItems)}
              <Button
                className="ScrollTop self-center"
                type="button"
                onClick={() => {
                  deleteItems(items.map((item) => item.id));
                  setTimeout(() => navigate(`..`, { replace: true }), 100);
                }}
                color="primary"
              >
                <i className="fa-solid fa-thumbs-up mr-2" />
                Approve all {posessive(userName)} activity
              </Button>
            </>
          ))}
          <hr className="h-[3px] bg-gradient-to-l from-indigo-500 to-fuchsia-500 opacity-20" />
          <Button
            className="ScrollTop self-center"
            type="button"
            onClick={() => {
              deleteItems(items.map((item) => item.id));
              setTimeout(() => navigate(`..`, { replace: true }), 100);
            }}
            color="primary"
          >
            <i className="fa-solid fa-thumbs-up mr-2" />
            Approve all user activity
          </Button>
        </ReviewDayWrapper>
      ) : (
        <div className="flex justify-center p-8">
          <PartyMessage>Nothing to review for this day</PartyMessage>
        </div>
      )}
    </UndoMainPadding>
  );
};

export default AllUsersActivityReviewDay;
