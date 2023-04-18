import { createSlice } from '@reduxjs/toolkit';
import { typesafe } from '@shared/ts-utils';
import { formatDate } from '@dash/datetime';
import { Result } from '@dash/types';
import type { ActivityItem } from '@dash/components';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  KeychainSummary,
  GetUserActivityDays,
  GetUserActivityDay,
  DateRangeInput,
  User,
  RequestState,
} from '@dash/types';
import Current from '../environment';
import { entireDay } from '../lib/helpers';
import { Req, toMap, toEditableMap, editable, commit, sortActivityDays } from './helpers';
import { createResultThunk } from './thunk';
import * as empty from './empty';
import { logoutRouteVisited } from './slice-auth';

export interface ActivityDay {
  userName: string;
  numDeleted: number;
  items: Record<UUID, ActivityItem>;
}

export type UserUpdate = { id: UUID } & (
  | { type: 'name'; value: string }
  | { type: 'screenshotsEnabled'; value: boolean }
  | { type: 'screenshotsResolution'; value: number }
  | { type: 'screenshotsFrequency'; value: number }
  | { type: 'keyloggingEnabled'; value: boolean }
  | { type: 'removeKeychain'; value: UUID }
);

type DeletableEntity = 'device' | 'user';

export interface UsersState {
  listRequest: RequestState;
  entities: Record<UUID, Editable<User>>;
  fetchAllUsersDay: Record<AllUsersActivityDayKey, RequestState>;
  fetchAllActivityOverviews: RequestState;
  fetchUserRequest: Record<UUID, RequestState>;
  updateUserRequest: Record<UUID, RequestState>;
  addDeviceRequest?: RequestState<number>;
  activityOverviews: Record<UUID, RequestState<GetUserActivityDays.Output>>;
  activityDays: Record<ActivityDayKey, RequestState<ActivityDay>>;
  deleting: { device?: UUID; user?: UUID };
  adding: { keychain?: KeychainSummary | null };
  deleted: UUID[];
}

export function initialState(): UsersState {
  return {
    listRequest: Req.idle(),
    entities: {},
    fetchAllUsersDay: {},
    fetchAllActivityOverviews: Req.idle(),
    fetchUserRequest: {},
    updateUserRequest: {},
    activityOverviews: {},
    activityDays: {},
    deleting: {},
    adding: {},
    deleted: [],
  };
}

export const slice = createSlice({
  name: `users`,
  initialState,
  reducers: {
    userEntityDeleteStarted(
      state,
      action: PayloadAction<{ type: DeletableEntity; id: UUID }>,
    ) {
      state.deleting[action.payload.type] = action.payload.id;
    },
    userEntityDeleteCanceled(state, { payload: type }: PayloadAction<DeletableEntity>) {
      delete state.deleting[type];
    },
    addDeviceDismissed(state) {
      delete state.addDeviceRequest;
    },
    newUserRouteVisited(state, { payload: id }: PayloadAction<UUID>) {
      state.entities[id] = editable(empty.user(id), true);
    },
    userUpdated: (state, { payload }: PayloadAction<UserUpdate>) => {
      const draft = state.entities[payload.id]?.draft;
      if (!draft) return;
      switch (payload.type) {
        case `name`:
          draft.name = payload.value;
          break;
        case `keyloggingEnabled`:
          draft.keyloggingEnabled = payload.value;
          break;
        case `screenshotsEnabled`:
          draft.screenshotsEnabled = payload.value;
          break;
        case `screenshotsResolution`:
          draft.screenshotsResolution = payload.value;
          break;
        case `screenshotsFrequency`:
          draft.screenshotsFrequency = payload.value;
          break;
        case `removeKeychain`:
          draft.keychains = draft.keychains.filter(({ id }) => id !== payload.value);
          break;
      }
    },
    addKeychainModalDismissed(state) {
      state.adding = { keychain: undefined };
    },
    addKeychainClicked(state) {
      state.adding = { keychain: null };
    },
    keychainSelected(state, action: PayloadAction<KeychainSummary>) {
      if (state.adding.keychain?.id === action.payload.id) {
        state.adding = { keychain: null };
      } else {
        state.adding = { keychain: action.payload };
      }
    },
    keychainAdded(state, { payload }: PayloadAction<UUID>) {
      const keychain = state.adding.keychain;
      if (!keychain) return;
      state.entities[payload]?.draft.keychains.push(keychain);
      state.adding = { keychain: undefined };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchActivityDay.started, (state, { meta: { arg } }) => {
      state.activityDays[activityDayKey(arg.userId, arg.day)] = Req.ongoing();
    });

    builder.addCase(logoutRouteVisited, () => {
      return initialState();
    });

    builder.addCase(fetchActivityDay.succeeded, (state, { payload, meta: { arg } }) => {
      state.activityDays[activityDayKey(arg.userId, arg.day)] = Req.succeed({
        userName: payload.userName,
        numDeleted: payload.numDeleted,
        items: itemsToMap(payload.items),
      });
    });

    builder.addCase(fetchActivityDay.failed, (state, { error, meta: { arg } }) => {
      state.activityDays[activityDayKey(arg.userId, arg.day)] = Req.fail(error);
    });

    builder.addCase(fetchUsers.started, (state) => {
      state.listRequest = Req.ongoing();
    });

    builder.addCase(fetchUsers.succeeded, (state, action) => {
      state.listRequest = Req.succeed(void 0);
      state.entities = { ...state.entities, ...toEditableMap(action.payload) };
    });

    builder.addCase(fetchUsers.failed, (state, action) => {
      state.listRequest = Req.fail(action.error);
    });

    builder.addCase(fetchUser.succeeded, (state, { meta, payload }) => {
      state.fetchUserRequest[meta.arg] = Req.succeed(void 0);
      state.entities[meta.arg] = editable(payload);
    });

    builder.addCase(fetchUser.failed, (state, action) => {
      state.fetchUserRequest[action.meta.arg] = Req.fail(action.error);
    });

    builder.addCase(fetchUser.started, (state, action) => {
      state.fetchUserRequest[action.meta.arg] = Req.ongoing();
    });

    builder.addCase(fetchActivityOverview.started, (state, action) => {
      state.activityOverviews[action.meta.arg.userId] = Req.ongoing();
    });

    builder.addCase(fetchActivityOverview.succeeded, (state, action) => {
      state.activityOverviews[action.meta.arg.userId] = Req.succeed({
        ...action.payload,
        days: sortActivityDays(action.payload.days),
      });
    });

    builder.addCase(fetchActivityOverview.failed, (state, action) => {
      state.activityOverviews[action.meta.arg.userId] = Req.fail(action.error);
    });

    builder.addCase(upsertUser.started, (state, { meta }) => {
      state.updateUserRequest[meta.arg] = Req.ongoing();
    });

    builder.addCase(upsertUser.failed, (state, { meta, error }) => {
      state.updateUserRequest[meta.arg] = Req.fail(error);
    });

    builder.addCase(upsertUser.succeeded, (state, { meta }) => {
      state.updateUserRequest[meta.arg] = Req.succeed(void 0);
      const user = state.entities[meta.arg];
      if (user) {
        state.entities[meta.arg] = commit(user);
      }
    });

    builder.addCase(deleteActivityItems.succeeded, (state, action) => {
      const { date, itemRootIds } = action.meta.arg;
      for (const day of matchingActivityDays(state.activityDays, date)) {
        day.numDeleted += itemRootIds.length;
        for (const id of itemRootIds) {
          const item = day.items[id];
          if (item) {
            item.deleted = true;
          }
        }
      }
    });

    builder.addCase(deleteUser.started, (state) => {
      delete state.deleting.user;
    });

    builder.addCase(deleteUser.succeeded, (state, { meta }) => {
      delete state.entities[meta.arg];
      state.deleted.push(meta.arg);
    });

    builder.addCase(deleteDevice.started, (state) => {
      delete state.deleting.device;
    });

    builder.addCase(deleteDevice.succeeded, (state, { meta: { arg } }) => {
      for (const [userId, user] of Object.entries(state.entities)) {
        if (user.draft.devices.some(({ id }) => id === arg)) {
          user.draft.devices = user.draft.devices.filter(({ id }) => id !== arg);
          state.entities[userId] = commit(user);
        }
      }
    });

    builder.addCase(createPendingAppConnection.started, (state) => {
      state.addDeviceRequest = Req.ongoing();
    });

    builder.addCase(createPendingAppConnection.succeeded, (state, { payload }) => {
      state.addDeviceRequest = Req.succeed(payload.code);
    });

    builder.addCase(createPendingAppConnection.failed, (state, { error }) => {
      state.addDeviceRequest = Req.fail(error);
    });

    builder.addCase(fetchUsersActivityDay.started, (state, action) => {
      state.fetchAllUsersDay[formatDate(action.meta.arg, `url`)] = Req.ongoing();
    });

    builder.addCase(fetchUsersActivityDay.succeeded, (state, { meta, payload }) => {
      const date = formatDate(meta.arg, `url`);
      state.fetchAllUsersDay[date] = Req.succeed(void 0);

      for (const activity of payload) {
        state.activityDays[activityDayKey(activity.userId, meta.arg)] = Req.succeed({
          userName: activity.userName,
          numDeleted: activity.numDeleted,
          items: itemsToMap(activity.items),
        });
      }
    });

    builder.addCase(fetchUsersActivityDay.failed, (state, { meta, error }) => {
      state.fetchAllUsersDay[formatDate(meta.arg, `url`)] = Req.fail(error);
    });

    builder.addCase(fetchUsersActivityOverviews.started, (state) => {
      state.fetchAllActivityOverviews = Req.ongoing();
    });

    builder.addCase(fetchUsersActivityOverviews.succeeded, (state, action) => {
      state.fetchAllActivityOverviews = Req.succeed(void 0);

      for (const overview of action.payload) {
        state.activityOverviews[overview.userId] = Req.succeed({
          userName: overview.userName,
          days: sortActivityDays(overview.days),
        });
      }
    });

    builder.addCase(fetchUsersActivityOverviews.failed, (state, { error }) => {
      state.fetchAllActivityOverviews = Req.fail(error);
    });
  },
});

// thunks

export const fetchActivityDay = createResultThunk(
  `${slice.name}/fetchActivityDay`,
  (arg: { userId: UUID; day: Date }) =>
    Current.api.getUserActivityDay({ userId: arg.userId, range: entireDay(arg.day) }),
);

export const fetchActivityOverview = createResultThunk(
  `${slice.name}/fetchActivityOverview`,
  (arg: { userId: UUID; ranges?: DateRangeInput[] }) =>
    Current.api.getUserActivityDays({
      userId: arg.userId,
      dateRanges: arg.ranges ?? entireDays(14),
    }),
);

export const fetchUsersActivityDay = createResultThunk(
  `${slice.name}/fetchUsersActivityDay`,
  (arg: Date) => Current.api.getUsersActivityDay({ range: entireDay(arg) }),
);

export const fetchUsersActivityOverviews = createResultThunk(
  `${slice.name}/fetchUsersActivityOverviews`,
  (arg: { ranges?: DateRangeInput[] }) =>
    Current.api.getUsersActivityOverviews(arg?.ranges ?? entireDays(14)),
);

export const fetchUsers = createResultThunk(
  `${slice.name}/fetchUsers`,
  Current.api.getUsers,
);

export const fetchUser = createResultThunk(
  `${slice.name}/fetchUser`,
  Current.api.getUser,
);

export const deleteUser = createResultThunk(
  `${slice.name}/deleteUser`,
  async (id: UUID) => Current.api.deleteEntity({ id, type: `User` }),
);

export const deleteDevice = createResultThunk(
  `${slice.name}/deleteDevice`,
  async (id: UUID) => Current.api.deleteEntity({ id, type: `Device` }),
);

export const upsertUser = createResultThunk(
  `${slice.name}/upsertUser`,
  async (userId: UUID, { getState }) => {
    const { users, auth } = getState();
    const user = users.entities[userId];
    const adminId = auth.admin?.adminId;
    if (!user || !adminId) {
      return Result.unexpectedError(`37abe6aa`, `User or AdminId not found`);
    }

    return Current.api.saveUser({
      id: user.draft.id,
      name: user.draft.name,
      keyloggingEnabled: user.draft.keyloggingEnabled,
      screenshotsEnabled: user.draft.screenshotsEnabled,
      screenshotsFrequency: user.draft.screenshotsFrequency,
      screenshotsResolution: user.draft.screenshotsResolution,
      isNew: user.isNew ?? false,
      keychainIds: user.draft.keychains.map(({ id }) => id),
    });
  },
);

export const deleteActivityItems = createResultThunk(
  `${slice.name}/deleteActivityItems`,
  async (arg: { date: Date; itemRootIds: UUID[] }, { getState }) => {
    let keystrokeLineIds: UUID[] = [];
    const screenshotIds: UUID[] = [];

    for (const day of matchingActivityDays(getState().users.activityDays, arg.date)) {
      for (const id of arg.itemRootIds) {
        const item = day.items[id];
        if (item?.type === `KeystrokeLine`) {
          keystrokeLineIds = [...keystrokeLineIds, ...item.ids];
        } else if (item?.type === `Screenshot`) {
          screenshotIds.push(item.id);
        }
      }
    }

    return Current.api.deleteActivityItems({
      keystrokeLineIds,
      screenshotIds,
    });
  },
);

function matchingActivityDays(
  activityDays: UsersState['activityDays'],
  date: Date,
): Array<ActivityDay> {
  const formattedDate = formatDate(date, `url`);
  const activityDaysSorted: Array<ActivityDay> = [];

  for (const [key, day] of typesafe.objectEntries(activityDays)) {
    if (!key.endsWith(formattedDate) || day.state !== `succeeded`) {
      continue;
    }
    activityDaysSorted.push(day.payload);
  }
  return activityDaysSorted;
}

export const createPendingAppConnection = createResultThunk(
  `${slice.name}/createPendingAppConnection`,
  Current.api.createPendingAppConnection,
);

// exports

export const {
  userUpdated,
  addDeviceDismissed,
  userEntityDeleteStarted,
  userEntityDeleteCanceled,
  addKeychainClicked,
  keychainSelected,
  keychainAdded,
  addKeychainModalDismissed,
  newUserRouteVisited,
} = slice.actions;

export default slice.reducer;

// helpers

type ActivityDayKey = string;
type AllUsersActivityDayKey = string;

export function activityDayKey(userId: UUID, date: Date): ActivityDayKey {
  return `${userId}--${formatDate(date, `url`)}`;
}

export function entireDays(numDays: number): DateRangeInput[] {
  const now = new Date();
  const ranges: DateRangeInput[] = [];
  for (let i = 0; i < numDays; i++) {
    const day = new Date(now.getTime());
    day.setDate(now.getDate() - i);
    ranges.push(entireDay(day));
  }
  return ranges;
}

function itemsToMap(items: GetUserActivityDay.Item[]): Record<UUID, ActivityItem> {
  const newRecord = toMap(
    items.map((item) => {
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
    }),
  );

  return newRecord;
}
