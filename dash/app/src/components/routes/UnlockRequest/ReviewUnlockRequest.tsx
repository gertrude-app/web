import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ErrorModal, LoadingModal, Modal, ReviewUnlockRequest } from '@dash/components';
import { useSelectableKeychains } from '../../../hooks/selectable-keychains';
import { useQuery, Key } from '../../../hooks/query';
import Current from '../../../environment';

const ReviewUnlockRequestRoute: React.FC = () => {
  const { id = ``, userId = `` } = useParams<{ id: UUID; userId: UUID }>();
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const navigate = useNavigate();

  // used by subsequent screens, prefetch to minimize spinners
  useQuery(Key.apps, Current.api.getIdentifiedApps);
  useQuery(Key.user(userId), () => Current.api.getUser(userId));
  useSelectableKeychains();

  const query = useQuery(Key.unlockRequest(id), () => Current.api.getUnlockRequest(id));

  if (query.isLoading) {
    return <LoadingModal />;
  }

  if (query.isError) {
    return <ErrorModal error={query.error} />;
  }

  if (query.data.status !== `pending`) {
    return <Navigate to=".." />;
  }

  return (
    <Modal
      type="container"
      icon="unlock"
      title="Unlock Request"
      onDismiss={() => navigate(`../..`)}
      primaryButton={{
        label: <>Accept &rarr;</>,
        action: () => navigate(`../select-keychain`),
      }}
      secondaryButton={{
        label: `Deny`,
        action: () => navigate(`../deny`),
      }}
    >
      <ReviewUnlockRequest
        detailsExpanded={detailsExpanded}
        setDetailsExpanded={() => setDetailsExpanded(!detailsExpanded)}
        {...query.data}
      />
    </Modal>
  );
};

export default ReviewUnlockRequestRoute;
