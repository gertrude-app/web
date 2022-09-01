import React, { useEffect } from 'react';
import Loading from '@shared/Loading';
import { useDispatch, useSelector } from '../../redux/hooks';
import ApiErrorMessage from '../ApiErrorMessage';
import { fetchAdminKeychains } from '../../redux/slice-admin';
import ListKeychains from '@shared/dashboard/Keychains/ListKeychains';
import Modal from '../shared/dashboard/Modal';

const Keychains: React.FC = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.admin.listKeychainsRequest);

  useEffect(() => {
    dispatch(fetchAdminKeychains());
  }, [dispatch]);

  if (request.state === `ongoing` || request.state === `idle`) {
    return <Loading />;
  }

  if (request.state === `failed`) {
    return <ApiErrorMessage error={request.error} />;
  }

  return (
    <div>
      <Modal isOpen={true} setIsOpen={() => {}} />
      <ListKeychains
        keychains={request.payload.map((keychain) => ({
          ...keychain,
          description: keychain.description || undefined,
          keys: keychain.keys.length,
        }))}
        removeKeychain={() => {}}
      />
    </div>
  );
};

export default Keychains;
