import Result from '../Result';
import { gql, query } from '../apollo';
import * as T from './__generated__/GetAdmin';

export async function getAdmin(id: UUID): Promise<Result<T.GetAdmin_admin, ApiError>> {
  const result = await query<T.GetAdmin, T.GetAdminVariables>(QUERY, { id });
  return result.mapApi((data) => data.admin);
}

const QUERY = gql`
  query GetAdmin($id: UUID!) {
    admin: getAdmin(id: $id) {
      email
      subscriptionStatus
      notifications {
        id
        trigger
        method {
          id
        }
      }
      verifiedNotificationMethods {
        id
        method {
          data {
            ... on EmailData {
              email
            }
            ... on TextData {
              phoneNumber
            }
            ... on SlackData {
              token
              channelName
              channelId
            }
          }
        }
      }
    }
  }
`;