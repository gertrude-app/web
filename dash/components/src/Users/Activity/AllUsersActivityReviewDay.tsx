import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/components';
import { UndoMainPadding } from '../../Chrome/Chrome';
import PartyMessage from '../../PartyMessage';
import KeystrokesViewer from './KeystrokesViewer';
import ScreenshotViewer from './ScreenshotViewer';
import { ActivityItem } from './UserActivityReviewDay';
import ReviewDayHeader from './ReviewDayHeader';
import { ReviewDayWrapper } from '../..';

interface Props {
  date: Date;
  items: ActivityItem[];
  numDeleted: number;
  deleteItems(ids: UUID[]): unknown;
  chunkSize?: number;
}

const UserActivityReviewDay: React.FC<Props> = ({
  date,
  items,
  numDeleted,
  deleteItems,
  chunkSize = 100,
}) => {
  const navigate = useNavigate();
  return (
    <UndoMainPadding>
      <ReviewDayHeader date={date} numItems={items.length} numDeleted={numDeleted} />
      {items.length > 0 ? (
        <ReviewDayWrapper>
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
            Approve all
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

export default UserActivityReviewDay;

function deleteableChunks(
  items: ActivityItem[],
  chunkSize: number,
  deleteItems: (ids: UUID[]) => unknown,
): JSX.Element[] {
  let numItemsRendered = 0;
  const ids: UUID[] = [];
  const elements: JSX.Element[] = [];
  const numChunks = Math.ceil(items.length / chunkSize);

  for (let chunkIndex = 0; chunkIndex < numChunks; chunkIndex++) {
    const chunkOffset = chunkIndex * chunkSize;
    const chunkItems = items.slice(chunkOffset, chunkOffset + chunkSize);

    for (const item of chunkItems) {
      ids.push(item.id);
      elements.push(renderItem(item, () => deleteItems([item.id]), numItemsRendered));
      numItemsRendered++;
    }

    if (chunkIndex < numChunks - 1) {
      const toDelete = [...ids];
      elements.push(
        <div key={`${ids[ids.length - 1] ?? ``}-separator`} className="self-center pb-8">
          <Button
            className="self-center"
            type="button"
            color="secondary-on-violet-bg"
            small
            onClick={() => {
              deleteItems(toDelete);
              // sometimes scrolling to top seems to fail, possibly because
              // the repaint hasn't finished, or maybe because of react re-renders,
              // so, retry a couple times to hopefully land in the right spot
              setTimeout(scrollToTop, 0);
              setTimeout(scrollToTop, 50);
              setTimeout(scrollToTop, 150);
            }}
          >
            Approve previous {[...ids].length} items
          </Button>
        </div>,
      );
    }
  }
  return elements;
}

function scrollToTop(): void {
  document.getElementById(`delete-focus`)?.scrollIntoView({
    behavior: `smooth`,
  });
}

function renderItem(
  item: ActivityItem,
  deleteItem: () => unknown,
  numRendered: number,
): JSX.Element {
  if (item.type === `Screenshot`) {
    return (
      <ScreenshotViewer
        key={item.id}
        url={item.url}
        width={item.width}
        height={item.height}
        onApprove={deleteItem}
        date={new Date(item.date)}
        lazy={numRendered > 10}
      />
    );
  } else {
    return (
      <KeystrokesViewer
        key={item.id}
        strokes={item.line}
        application={item.appName}
        onApprove={deleteItem}
        date={new Date(item.date)}
      />
    );
  }
}
