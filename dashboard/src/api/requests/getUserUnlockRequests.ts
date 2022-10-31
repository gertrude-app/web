import Result from '../Result';
import { gql, query } from '../apollo';
import * as T from './__generated__/UserUnlockRequests';
import { mapUnlockRequest, UNLOCK_REQUEST_FIELDS } from './getUnlockRequest';

export async function getUserUnlockRequests(
  userId: UUID,
): Promise<Result<UnlockRequest[], ApiError>> {
  const result = await query<T.UserUnlockRequests, T.UserUnlockRequestsVariables>(QUERY, {
    id: userId,
  });
  return result.mapApi((data) => data.unlockRequests.map(mapUnlockRequest));
}

const QUERY = gql`
  ${UNLOCK_REQUEST_FIELDS}
  query UserUnlockRequests($id: UUID!) {
    unlockRequests: getUserUnlockRequests(id: $id) {
      ...UnlockRequestFields
    }
  }
`;