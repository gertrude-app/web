import React from 'react';
import cx from 'classnames';
import { Subcomponents } from '../../../types';
import UnlockRequestCard from '../../Dashboard/Widgets/UnlockRequests/UnlockRequestCard';
import PageHeading from '../../PageHeading';
import { RequestStatus } from '../../types/GraphQL';
import { newestFirst } from '../../lib/helpers';
import { posessive } from '../../lib/string';
import PartyMessage from '../../../PartyMessage';

type Props = {
  requests: Subcomponents<typeof UnlockRequestCard>;
};

const ListUnlockRequests: React.FC<Props> = ({ requests }) => (
  <div className="flex flex-col space-y-6">
    <PageHeading icon="unlock">
      {requests.length > 0
        ? `${posessive(requests[0]?.userName ?? ``)} unlock requests`
        : `Unlock requests`}
    </PageHeading>
    {requests.length > 0 ? (
      <div className={cx(requests.length > 1 && `grid gap-5 grid-cols-1 lg:grid-cols-2`)}>
        {requests
          .sort((a, b) =>
            a.status === RequestStatus.pending && b.status !== RequestStatus.pending
              ? -1
              : newestFirst(a, b),
          )
          .map((request) => (
            <UnlockRequestCard key={request.id} {...request} />
          ))}
      </div>
    ) : (
      <PartyMessage>No unlock requests for this user</PartyMessage>
    )}
  </div>
);

export default ListUnlockRequests;