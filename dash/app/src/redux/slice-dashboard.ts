import { createSlice } from '@reduxjs/toolkit';
import type { GetDashboardWidgets, RequestState } from '@dash/types';
import { Req } from './helpers';
import { acceptUnlockRequest, rejectUnlockRequest } from './slice-unlock-requests';
import { logoutRouteVisited } from './slice-auth';

type Widgets = GetDashboardWidgets.Output;

export interface DashboardState {
  request: RequestState<Widgets>;
}

export function initialState(): DashboardState {
  return {
    request: Req.idle(), // todo, remove state
  };
}

export const slice = createSlice({
  name: `dashboard`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutRouteVisited, () => {
      return initialState();
    });

    builder.addCase(rejectUnlockRequest.succeeded, (state, action) => {
      const payload = Req.payload(state.request);
      if (payload) {
        payload.unlockRequests = payload.unlockRequests.filter(
          (unlockReq) => unlockReq.id !== action.meta.arg,
        );
      }
    });

    builder.addCase(acceptUnlockRequest.succeeded, (state, action) => {
      const payload = Req.payload(state.request);
      if (payload) {
        payload.unlockRequests = payload.unlockRequests.filter(
          (unlockReq) => unlockReq.id !== action.meta.arg,
        );
      }
    });
  },
});

export default slice.reducer;
