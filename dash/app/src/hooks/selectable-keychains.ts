import { useEffect } from 'react';
import type { KeychainSummary, RequestState } from '@dash/types';
import type { QueryResult } from './query';
import { fetchSelectableKeychains } from '../redux/slice-keychains';
import { useDispatch, useSelector } from '../redux/hooks';
import { Req } from '../redux/helpers';
import Current from '../environment';
import { useQuery, Key } from './query';

// todo: delete me
export default function useSelectableKeychains(
  fetch = true,
): RequestState<{ own: KeychainSummary[]; public: KeychainSummary[] }> {
  const dispatch = useDispatch();
  const adminId = useSelector((state) => state.auth.admin?.adminId) ?? ``;
  const { entities, fetchSelectableKeychainsRequest } = useSelector(
    (state) => state.keychains,
  );

  useEffect(() => {
    if (fetch && fetchSelectableKeychainsRequest.state === `idle`) {
      dispatch(fetchSelectableKeychains());
    }
  }, [dispatch, fetch, fetchSelectableKeychainsRequest.state]);

  if (fetchSelectableKeychainsRequest.state === `succeeded`) {
    return Req.succeed({
      public: Object.values(entities)
        .map((keychain) => keychain.original)
        .filter((keychain) => keychain.isPublic && keychain.authorId !== adminId),
      own: Object.values(entities)
        .map((keychain) => keychain.original)
        .filter((keychain) => keychain.authorId === adminId),
    });
  }
  return fetchSelectableKeychainsRequest;
}

export function _useSelectableKeychains(): QueryResult<{
  own: KeychainSummary[];
  public: KeychainSummary[];
}> {
  return useQuery(Key.selectableKeychains, Current.api.getSelectableKeychains);
}
