import React, { useReducer } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Loading, ApiErrorMessage } from '@dash/components';
import { toKeyRecord } from '@dash/keys';
import { EditKeychain } from '@dash/components';
import { Result } from '@dash/types';
import type { KeychainSummary } from '@dash/types';
import { isDirty } from '../../redux/helpers';
import { Key, useMutation, useQuery } from '../../hooks/query';
import Current from '../../environment';
import reducer from '../../reducers/edit-keychain-reducer';
import { useConfirmableDelete } from '../../hooks/delete-entity';

const Keychain: React.FC = () => {
  const { keychainId: id = `` } = useParams<{ keychainId: string }>();
  const [state, dispatch] = useReducer(reducer, { keys: [] });
  const editableKeychain = state.keychain;
  const queryKey = Key.adminKeychain(id);
  const appsQuery = useQuery(Key.apps, Current.api.getIdentifiedApps);
  const deleteKeychain = useConfirmableDelete(`Keychain`, { id });
  const deleteKey = useConfirmableDelete(`Key`, { invalidating: [queryKey] });

  const keychainQuery = useQuery(queryKey, () => Current.api.getAdminKeychain(id), {
    onReceive: (keychain) => dispatch({ type: `receivedKeychain`, keychain }),
  });

  const saveKeychain = useMutation({
    id: `upsert:keychain`,
    fn: (keychain: Editable<KeychainSummary>) =>
      Current.api.saveKeychain({
        isNew: keychain.isNew ?? false,
        id: keychain.draft.id,
        name: keychain.draft.name,
        description: keychain.draft.description,
        isPublic: keychain.draft.isPublic,
      }),
    invalidating: [queryKey],
  });

  const saveKey = useMutation({
    id: `upsert:key`,
    fn: () => {
      const keyRecord = toKeyRecord(state.editingKey);
      if (!keyRecord) return Result.resolveUnexpected(`aa11e7f2`);
      return Current.api.saveKey({
        isNew: state.editingKey?.isNew ?? false,
        id: keyRecord.id,
        keychainId: keyRecord.keychainId,
        key: keyRecord.key,
        comment: keyRecord.comment,
        expiration: keyRecord.expiration,
      });
    },
    invalidating: [queryKey],
  });

  if (deleteKeychain.state === `success`) {
    return <Navigate to="/keychains" />;
  }

  if (keychainQuery.isError) {
    return <ApiErrorMessage error={keychainQuery.error} />;
  }

  if (appsQuery.isError) {
    return <ApiErrorMessage error={appsQuery.error} />;
  }

  if (!editableKeychain || !appsQuery.data) {
    return <Loading />;
  }

  return (
    <EditKeychain
      isNew={editableKeychain.isNew ?? false}
      apps={appsQuery.data}
      name={editableKeychain.draft.name}
      description={editableKeychain.draft.description ?? ``}
      keys={state.keys}
      editingKey={state.editingKey}
      setName={(name) => dispatch({ type: `updateName`, name })}
      setDescription={(description) => dispatch({ type: `updateDesc`, description })}
      deleteKeychain={deleteKeychain}
      deleteKey={deleteKey}
      saveButtonDisabled={saveKeychain.isLoading || !isDirty(editableKeychain)}
      onSave={() => saveKeychain.mutate(editableKeychain)}
      beginEditKey={(id) => dispatch({ type: `beginEditKey`, id })}
      updateEditingKey={(event) => dispatch({ type: `updateEditingKey`, event })}
      dismissEditKeyModal={() => dispatch({ type: `cancelEditKey` })}
      onKeySave={() => saveKey.mutate(undefined)}
      onCreateNewKey={() => dispatch({ type: `createNewKey` })}
      keyModalSaveButtonDisabled={
        toKeyRecord(state.editingKey) === null || saveKey.isLoading
      }
    />
  );
};

export default Keychain;
