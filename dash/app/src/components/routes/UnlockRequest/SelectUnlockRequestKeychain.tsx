import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, KeychainPicker, LoadingModal, ErrorModal } from '@dash/components';
import { _useSelectableKeychains } from '../../../hooks/selectable-keychains';
import Current from '../../../environment';
import { useQuery, Key, useZip } from '../../../hooks/query';

const SelectUnlockRequestKeychain: React.FC = () => {
  const { userId = `` } = useParams<{ id: UUID; userId: UUID }>();
  const [keychainId, setKeychainId] = useState<UUID | undefined>();
  const navigate = useNavigate();

  const query = useZip(
    _useSelectableKeychains(),
    useQuery(Key.user(userId), () => Current.api.getUser(userId)),
  );

  if (query.isLoading) {
    return <LoadingModal />;
  }

  if (query.isError) {
    return <ErrorModal error={query.error} />;
  }

  const [keychains, user] = query.data;
  const userKeychainIds = user.keychains.map((keychain) => keychain.id);
  const selectableKeychains = keychains.own
    .filter((kc) => userKeychainIds.includes(kc.id))
    .concat(keychains.public.filter((kc) => kc.authorId === keychains.own[0]?.authorId));

  return (
    <Modal
      type="container"
      icon="key"
      title="Select a keychain"
      onDismiss={() => navigate(`../..`)}
      secondaryButton={{
        label: <>&larr; Back</>,
        action: () => navigate(`../review`),
      }}
      primaryButton={{
        label: <>Review key &rarr;</>,
        disabled: !keychainId,
        action: () => navigate(`../edit-key/${keychainId}`),
      }}
    >
      <KeychainPicker
        mode="forUnlockRequestKey"
        hasNoOwnKeychains={keychains.own.length === 0}
        selectableOwnKeychains={selectableKeychains}
        selectablePublicKeychains={[]}
        onSelect={(keychain) => setKeychainId(keychain.id)}
        selectedId={keychainId}
        userName={user.name}
        userId={user.id}
      />
    </Modal>
  );
};

export default SelectUnlockRequestKeychain;
