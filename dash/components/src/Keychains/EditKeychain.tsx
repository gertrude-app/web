import React from 'react';
import { Button, TextInput } from '@shared/components';
import { ConfirmableEntityAction } from '@dash/types';
import { EditKey, KeyRecord } from '@dash/keys';
import { inflect } from '@dash/utils';
import Modal, { ConfirmDeleteEntity } from '../Modal';
import PageHeading from '../PageHeading';
import KeyCreator from '../KeyCreator/KeyCreator';
import KeyList from '../Keychains/KeyList';
import EmptyState from '../EmptyState';

type Props = {
  isNew: boolean;
  name: string;
  description: string;
  setName(name: string): unknown;
  setDescription(description: string): unknown;
  deleteKeychain: ConfirmableEntityAction<void>;
  deleteKey: ConfirmableEntityAction;
  keys: KeyRecord[];
  saveButtonDisabled: boolean;
  onSave(): unknown;
  editingKey?: EditKey.State;
  beginEditKey(id: UUID): unknown;
  updateEditingKey(event: EditKey.Event): unknown;
  dismissEditKeyModal(): unknown;
  onKeySave(): unknown;
  onCreateNewKey(): unknown;
  keyModalSaveButtonDisabled: boolean;
  apps: React.ComponentProps<typeof KeyCreator>['apps'];
};

const EditKeychain: React.FC<Props> = ({
  isNew,
  name,
  description,
  setName,
  setDescription,
  keys,
  deleteKeychain,
  deleteKey,
  saveButtonDisabled,
  onSave,
  editingKey,
  updateEditingKey,
  dismissEditKeyModal,
  onKeySave,
  beginEditKey,
  onCreateNewKey,
  keyModalSaveButtonDisabled,
  apps,
}) => (
  <div className="relative max-w-3xl">
    <Modal
      type="container"
      maximizeWidthForSmallScreens
      title={editingKey?.isNew ? `Create a new key` : `Edit key`}
      isOpen={!!editingKey}
      icon="key"
      primaryButtonText={
        <>
          {editingKey?.isNew ? `Create` : `Save`} key
          <i className="fa-solid fa-key ml-2" />
        </>
      }
      primaryButtonDisabled={keyModalSaveButtonDisabled}
      onPrimaryClick={onKeySave}
      onSecondaryClick={dismissEditKeyModal}
    >
      {editingKey && <KeyCreator update={updateEditingKey} {...editingKey} apps={apps} />}
    </Modal>
    <ConfirmDeleteEntity type="keychain" action={deleteKeychain} />
    <ConfirmDeleteEntity type="key" action={deleteKey} />
    <PageHeading icon="key" className="mb-4">
      {isNew ? `Create Keychain` : `Edit Keychain`}
    </PageHeading>
    <div className="mt-8 space-y-8">
      <TextInput
        type="text"
        label="Name:"
        value={name}
        setValue={setName}
        className="max-w-xl"
      />
      <TextInput
        type="textarea"
        rows={5}
        label="Description:"
        value={description}
        setValue={setDescription}
      />
      <div>
        {keys.length > 0 ? (
          <>
            <h2 className="mb-2 text-lg font-bold text-gray-700">
              {keys.length} {inflect(`key`, keys.length)}:
            </h2>
            <KeyList
              keys={keys}
              editKey={beginEditKey}
              deleteKey={(id) => deleteKey.start(id)}
            />
            <div className="mt-4 flex justify-end">
              <Button
                color="secondary-white"
                small
                type="button"
                onClick={onCreateNewKey}
              >
                <i className="fa-solid fa-plus mr-2" />
                Add new key
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            heading={`No keys`}
            secondaryText="Add a key to this keychain:"
            icon={`key`}
            buttonText={`Create key`}
            action={onCreateNewKey}
          />
        )}
      </div>
      <div className="flex mt-5 justify-end border-t-2 pt-8 space-x-5">
        {!isNew && (
          <Button
            type="button"
            onClick={deleteKeychain.start}
            color="secondary-warning"
            small
          >
            Delete keychain
          </Button>
        )}
        <Button
          small
          type="button"
          disabled={saveButtonDisabled}
          onClick={onSave}
          color="primary-violet"
        >
          {isNew ? `Create` : `Save`} keychain
        </Button>
      </div>
    </div>
  </div>
);

export default EditKeychain;