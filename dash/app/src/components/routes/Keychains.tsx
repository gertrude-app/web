import React from 'react';
import { Loading, ListKeychains, ApiErrorMessage } from '@dash/components';
import { useQuery, Key } from '../../hooks/query';
import Current from '../../environment';
import { useConfirmableDelete } from '../../hooks/delete-entity';

const Keychains: React.FC = () => {
  const query = useQuery(Key.adminKeychains, Current.api.getAdminKeychains);
  const deleteKeychain = useConfirmableDelete(`Keychain`, {
    invalidating: [Key.adminKeychains],
  });

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError) {
    return <ApiErrorMessage />;
  }

  return (
    <ListKeychains
      keychains={query.data.map((keychain) => ({
        id: keychain.summary.id,
        name: keychain.summary.name,
        isPublic: keychain.summary.isPublic,
        mode: `list`,
        removeText: `Delete`,
        description: keychain.summary.description || undefined,
        numKeys: keychain.summary.numKeys,
      }))}
      remove={deleteKeychain}
    />
  );
};

export default Keychains;
