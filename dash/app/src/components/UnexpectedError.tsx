import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorModal } from '@dash/components/src/Modal';

const UnexpectedError: React.FC<{ id: string }> = () => {
  // TODO: send something to a logging service, using `errorId`
  const navigate = useNavigate();
  return <ErrorModal title="Unexpected error" primaryButton={() => navigate(`/`)} />;
};

export default UnexpectedError;
