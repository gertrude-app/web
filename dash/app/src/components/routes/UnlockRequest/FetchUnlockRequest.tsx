import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ErrorModal, LoadingModal, Modal, UserInputText } from '@dash/components';
import Current from '../../../environment';
import { useQuery, Key } from '../../../hooks/query';

const FetchUnlockRequest: React.FC = () => {
  const { id = `` } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const query = useQuery(Key.unlockRequest(id), () => Current.api.getUnlockRequest(id));

  if (query.isLoading) {
    return <LoadingModal />;
  }

  if (query.isError) {
    return <ErrorModal error={query.error} />;
  }

  const unlockRequest = query.data;
  if (unlockRequest.status === `pending`) {
    return <Navigate to="./review" replace />;
  }

  return (
    <Modal
      title="Unlock Request"
      primaryButton={() => navigate(`..`)}
      icon={unlockRequest.status === `rejected` ? `thumbs-down` : `thumbs-up`}
    >
      <div className="mt-4">
        <span className="text-base pr-1">The unlock request has been</span>
        <UserInputText small>{unlockRequest.status}</UserInputText>.
      </div>
    </Modal>
  );
};

export default FetchUnlockRequest;
