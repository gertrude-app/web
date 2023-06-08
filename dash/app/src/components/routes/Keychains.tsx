import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Loading, ListKeychains, ApiErrorMessage } from '@dash/components';
import { typesafe } from '@shared/ts-utils';
import { useDispatch, useSelector } from '../../redux/hooks';
import { original } from '../../redux/helpers';
import {
  keychainEntityDeleteCanceled,
  createKeychainInitiated,
  deleteKeychain,
  fetchAdminKeychains,
  keychainEntityDeleteStarted,
} from '../../redux/slice-keychains';
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

  // return <pre>{JSON.stringify(query.data, null, 2)}</pre>;
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
      // remove={{
      //   // id: deleteId,
      //   start: (_id) => {},
      //   confirm: () => {},
      //   cancel: () => {},
      // }}
      remove={deleteKeychain}
      // remove={{
      //   id: deleteId,
      //   start: (id) => dispatch(keychainEntityDeleteStarted({ type: `keychain`, id })),
      //   confirm: () => deleteId && dispatch(deleteKeychain(deleteId)),
      //   cancel: () => dispatch(keychainEntityDeleteCanceled(`keychain`)),
      // }}
      // onCreateNew={() => dispatch(createKeychainInitiated({ id: uuid(), adminId }))}
      onCreateNew={() => {}}
    />
  );

  // const dispatch = useDispatch();
  // const adminId = useSelector((state) => state.auth.admin?.adminId ?? ``);
  // const request = useSelector((state) => state.keychains.listAdminKeychainsRequest);
  // const deleteId = useSelector((state) => state.keychains.deleting.keychain);
  // const keychains = useSelector((state) =>
  //   typesafe
  //     .objectValues(state.keychains.entities)
  //     .filter((keychain) => keychain.original.authorId === adminId)
  //     // in case they started making a keychain and then navigated back here
  //     .filter((keychain) => !keychain.isNew),
  // );
  // const keyRecords = useSelector((state) =>
  //   typesafe.objectValues(state.keychains.keyRecords).map(original),
  // );

  // const reqState = request.state;
  // useEffect(() => {
  //   reqState === `idle` && dispatch(fetchAdminKeychains());
  // }, [dispatch, reqState]);

  // if (request.state === `ongoing` || request.state === `idle`) {
  //   return <Loading />;
  // }

  // if (request.state === `failed`) {
  //   return <ApiErrorMessage error={request.error} />;
  // }

  // return (
  //   <ListKeychains
  //     keychains={keychains.map(({ original: keychain }) => ({
  //       ...keychain,
  //       mode: `list`,
  //       removeText: `Delete`,
  //       description: keychain.description || undefined,
  //       numKeys: keyRecords.filter((key) => key.keychainId === keychain.id).length,
  //     }))}
  //     remove={{
  //       id: deleteId,
  //       start: (id) => dispatch(keychainEntityDeleteStarted({ type: `keychain`, id })),
  //       confirm: () => deleteId && dispatch(deleteKeychain(deleteId)),
  //       cancel: () => dispatch(keychainEntityDeleteCanceled(`keychain`)),
  //     }}
  //     onCreateNew={() => dispatch(createKeychainInitiated({ id: uuid(), adminId }))}
  //   />
  // );
};

export default Keychains;
