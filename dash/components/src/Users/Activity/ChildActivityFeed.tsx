import { Button } from '@shared/components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UndoMainPadding } from '../../Chrome/Chrome';
import EmptyState from '../../EmptyState';
import DeletableActivityChunks from './DeletableActivityChunks';
import FeedHeader from './FeedHeader';
import ReviewDayWrapper from './ReviewDayWrapper';

interface Screenshot {
  type: `Screenshot`;
  width: number;
  height: number;
  url: string;
  flagged: boolean;
  duringSuspension: boolean;
}

interface KeystrokeLine {
  type: `KeystrokeLine`;
  appName: string;
  line: string;
  flagged: boolean;
  duringSuspension: boolean;
}

export type ActivityFeedItem = (Screenshot | KeystrokeLine) & {
  id: UUID;
  ids: UUID[];
  date: string;
  deleted?: boolean;
};

interface Props {
  date: Date;
  items: ActivityFeedItem[];
  numDeleted: number;
  deleteItems(ids: UUID[]): unknown;
  flagItem(id: UUID): unknown;
  chunkSize?: number;
  highlightSuspensionActivity: boolean;
}

const ChildActivityFeed: React.FC<Props> = ({
  date,
  items,
  numDeleted,
  deleteItems,
  flagItem,
  chunkSize = 100,
  highlightSuspensionActivity,
}) => {
  const navigate = useNavigate();
  const hasFlagged = items.some((item) => item.flagged);
  return (
    <UndoMainPadding className="px-0 md:px-8 lg:px-10 py-5 md:py-10 pt-0 md:pt-4 pb-16 flex flex-col bg-slate-100 md:bg-slate-50">
      <FeedHeader date={date} numItems={items.length} numDeleted={numDeleted} />
      {items.length > 0 ? (
        <ReviewDayWrapper>
          <DeletableActivityChunks
            items={items}
            chunkSize={chunkSize}
            deleteItems={deleteItems}
            flagItem={flagItem}
            highlightSuspensionActivity={highlightSuspensionActivity}
          />
          <Button
            className="ScrollTop self-center"
            disabled={items.every((item) => item.flagged)}
            type="button"
            onClick={() => {
              deleteItems(items.map((item) => item.id));
              setTimeout(
                () => navigate(`..`, { replace: true }),
                hasFlagged ? 2000 : 200,
              );
            }}
            color="primary"
            size="large"
          >
            <i className="fa-solid fa-thumbs-up mr-2" />
            Delete {hasFlagged ? `unflagged` : `all`} activity
          </Button>
        </ReviewDayWrapper>
      ) : (
        <FeedCaughtUp />
      )}
    </UndoMainPadding>
  );
};

export default ChildActivityFeed;

export const FeedCaughtUp: React.FC = () => (
  <EmptyState
    heading="All caught up!"
    secondaryText="Nothing left to review for this day."
    icon="image"
    buttonText="Back to activity"
    buttonIcon="arrow-left"
    action="../"
    className="max-w-7xl"
  />
);
