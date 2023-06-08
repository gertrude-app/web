import { useEffect } from 'react';
import type { GetIdentifiedApps, RequestState } from '@dash/types';
import type { QueryResult } from './query';
import { getIdentifiedApps } from '../redux/slice-apps';
import { useDispatch, useSelector } from '../redux/hooks';
import Current from '../environment';
import { useQuery, Key } from './query';

export default function useApps(fetch = true): RequestState<GetIdentifiedApps.Output> {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps.request);

  useEffect(() => {
    if (fetch && apps.state === `idle`) {
      dispatch(getIdentifiedApps());
    }
  }, [dispatch, fetch, apps.state]);

  return apps;
}

export function _useApps(): QueryResult<GetIdentifiedApps.Output> {
  return useQuery(Key.apps, Current.api.getIdentifiedApps);
}
