import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import { ErrorModal, KeyCreator, LoadingModal, Modal } from '@dash/components';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { convert, toKeyRecord } from '@dash/keys';
import { Result } from '@dash/types';
import type { EditKey } from '@dash/keys';
import Current from '../../../environment';
import { useQuery, Key, useZip, useMutation } from '../../../hooks/query';
import editKeyReducer from '../../../redux/edit-key-reducer';

const EditUnlockRequestKey: React.FC = () => {
  const { id = ``, keychainId = `` } = useParams<{ id: string; keychainId: string }>();
  const [key, setKey] = useState<EditKey.State | null>(null);
  const navigate = useNavigate();

  const query = useZip(
    useQuery(Key.apps, Current.api.getIdentifiedApps),
    useQuery(Key.unlockRequest(id), () => Current.api.getUnlockRequest(id), {
      onReceive: (unlockRequest) =>
        setKey(convert.unlockRequestToState(uuid(), keychainId, unlockRequest)),
    }),
  );

  const accept = useMutation(`accept:unlock-request`, async (key: EditKey.State) => {
    const keyRecord = convert.toKeyRecord(key);
    if (!keyRecord) return Result.resolveUnexpected(`76cfc4ee`);
    const insert = await Current.api.saveKey({ isNew: true, ...keyRecord });
    if (insert.isError) return insert;
    // TODO: make an `AcceptUnlockRequest` pair, to combine these
    return Current.api.updateUnlockRequest({ id, status: `accepted` });
  });

  if (accept.isError) {
    return (
      <ErrorModal
        title="Error accepting unlock request"
        error={accept.error}
        primaryButton={{ label: `Try again`, action: () => navigate(`..`) }}
      />
    );
  }

  if (query.isError) {
    return <ErrorModal error={query.error} />;
  }

  if (query.isLoading || accept.isLoading || !key) {
    return <LoadingModal />;
  }

  if (accept.isSuccess) {
    return <Navigate to=".." />;
  }

  return (
    <Modal
      icon="key"
      type="container"
      title="Review/edit unlocking key"
      onDismiss={() => navigate(`../..`)}
      secondaryButton={{
        label: <>&larr; Back</>,
        action: () => navigate(`../select-keychain`),
      }}
      primaryButton={{
        label: <>Submit &rarr;</>,
        action: () => accept.mutate(key),
        disabled: toKeyRecord(key) === null,
      }}
    >
      <div className="px-2">
        <KeyCreator
          {...key}
          update={(event) => {
            editKeyReducer(key, event);
            setKey({ ...key });
          }}
          apps={query.data[0]}
        />
      </div>
    </Modal>
  );
};

export default EditUnlockRequestKey;
