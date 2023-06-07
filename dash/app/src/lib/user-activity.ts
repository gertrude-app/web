import type { UserActivityFeed } from '@dash/types';
import type { ActivityFeedItem } from '@dash/components';

export function outputItemToActivityFeedItem(
  item: UserActivityFeed.Item,
): ActivityFeedItem {
  if (item.type === `CoalescedKeystrokeLine`) {
    return {
      type: `KeystrokeLine` as const,
      date: item.value.createdAt,
      ...item.value,
    };
  } else {
    return {
      type: `Screenshot` as const,
      date: item.value.createdAt,
      ...item.value,
    };
  }
}

export function prepareActivityDelete(
  itemRootIds: UUID[],
  queryData: UserActivityFeed.Output,
): [
  input: { keystrokeLineIds: UUID[]; screenshotIds: UUID[] },
  optimisticUpdate: UserActivityFeed.Output,
] {
  let keystrokeLineIds: UUID[] = [];
  const screenshotIds: UUID[] = [];
  const remainingItems = queryData.items.filter((item) => {
    if (itemRootIds.includes(item.value.id)) {
      if (item.type === `CoalescedKeystrokeLine`) {
        keystrokeLineIds = [...keystrokeLineIds, ...item.value.ids];
      } else {
        screenshotIds.push(item.value.id);
      }
      return false;
    }
    return true;
  });
  return [
    { keystrokeLineIds, screenshotIds },
    {
      userName: queryData.userName,
      items: remainingItems,
      numDeleted: itemRootIds.length + queryData.numDeleted,
    },
  ];
}
