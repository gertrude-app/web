import React from 'react';
import cx from 'classnames';
import type { KeychainSummary as Keychain } from '@dash/types';
import EmptyState from '../EmptyState';
import KeychainCard from './KeychainCard';

type Props = {
  mode: 'addToUser' | 'forUnlockRequestKey';
  hasNoOwnKeychains: boolean;
  selectableOwnKeychains: Keychain[];
  selectablePublicKeychains: Keychain[];
  onSelect(keychain: Keychain): unknown;
  selectedId?: UUID;
};

const KeychainPicker: React.FC<Props> = ({
  mode,
  hasNoOwnKeychains,
  selectableOwnKeychains,
  selectedId,
  selectablePublicKeychains,
  onSelect,
}) => (
  <div
    className={cx(
      `flex flex-col gap-6 *sm:bg-gray-50 xs:min-w-[450px] rounded-xl *sm:p-4`,
      (selectableOwnKeychains.length > 0 || mode === `addToUser`) &&
        `sm:bg-gray-50 sm:p-4`,
    )}
  >
    {selectableOwnKeychains.length !== 0 && (
      <div>
        {mode === `addToUser` && (
          <h2 className="text-lg font-bold text-gray-600 mb-3">Your keychains:</h2>
        )}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {selectableOwnKeychains.map((keychain) => (
            <KeychainCard
              mode="select"
              key={keychain.id}
              name={keychain.name}
              numKeys={keychain.numKeys}
              isPublic={keychain.isPublic}
              onSelect={() => onSelect(keychain)}
              selected={selectedId === keychain.id}
            />
          ))}
        </div>
      </div>
    )}
    {hasNoOwnKeychains && (
      <EmptyState
        icon="key"
        heading={`No personal keychains`}
        secondaryText={
          mode === `addToUser`
            ? `Select a public keychain or create your own.`
            : `You'll need to create a keychain and add it to this user to accept this unlock request.`
        }
        buttonText="Create a keychain"
        action="/keychains"
      />
    )}
    {!hasNoOwnKeychains && selectableOwnKeychains.length === 0 && (
      <EmptyState
        icon="key"
        heading={
          mode === `forUnlockRequestKey`
            ? `No keychains associated with this user`
            : `No selectable keychains`
        }
        secondaryText={
          mode === `forUnlockRequestKey`
            ? `You'll need to add a keychain to this user to accept this unlock request, or create a new keychain if you don't have any.`
            : `This user already has all of your keychains. Add a new one, or choose a public keychain.`
        }
        buttonText="Create a keychain"
        action="/keychains"
      />
    )}

    {mode === `addToUser` && selectablePublicKeychains.length > 0 && (
      <div>
        <h2 className={cx(`text-lg font-bold text-gray-600 mb-3`)}>Public keychains:</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {selectablePublicKeychains.map((keychain) => (
            <KeychainCard
              mode="select"
              key={keychain.id}
              name={keychain.name}
              numKeys={keychain.numKeys}
              isPublic={keychain.isPublic}
              onSelect={() => onSelect(keychain)}
              selected={selectedId === keychain.id}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);

export default KeychainPicker;
