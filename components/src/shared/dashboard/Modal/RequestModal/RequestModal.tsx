import React from 'react';
import Modal from '../Modal';

interface Props<Payload> {
  request?: RequestState<Payload>;
  successTitle: string;
  errorTitle?: string;
  withPayload: (payload: Payload) => React.ReactNode;
  withError?: (error?: ApiError) => React.ReactNode;
  onPrimaryClick(): unknown;
  onDismiss(): unknown;
  icon?: string;
}

function RequestModal<Payload>({
  request,
  successTitle,
  errorTitle = `Error`,
  withError,
  withPayload,
  onDismiss,
  onPrimaryClick,
  icon,
}: Parameters<React.FC<Props<Payload>>>[0]): ReturnType<React.FC<Props<Payload>>> {
  return (
    <Modal
      type={request?.state === `failed` ? `error` : `default`}
      title={request?.state === `failed` ? errorTitle : successTitle}
      loading={request?.state === `ongoing`}
      isOpen={!!request}
      onPrimaryClick={onPrimaryClick}
      onDismiss={onDismiss}
      icon={icon}
    >
      {request?.state === `succeeded` ? withPayload(request.payload) : null}
      {request?.state === `failed`
        ? withError
          ? withError(request.error)
          : `Sorry, something went wrong, please try again.`
        : null}
    </Modal>
  );
}

export default RequestModal;