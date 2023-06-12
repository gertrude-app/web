import React from 'react';
import { FullscreenModalForm } from '@dash/components';
import { useParams } from 'react-router-dom';
import { useQuery, Key } from '../../hooks/query';
import Current from '../../environment';

const VerifySignupEmail: React.FC = () => {
  const { token = `` } = useParams<{ token: UUID }>();

  const verifyEmail = useQuery(
    Key.verifySignupEmail(token),
    () => Current.api.verifySignupEmail({ token }),
    { neverRefetch: true },
  );

  const getCheckoutUrl = useQuery(
    Key.checkoutUrl,
    () => Current.api.getCheckoutUrl({ adminId: verifyEmail.data?.adminId ?? `` }),
    {
      enabled: verifyEmail.isSuccess,
      neverRefetch: true,
    },
  );

  if (verifyEmail.isError) {
    return <FullscreenModalForm request="failed" error="Failed to verify your email." />;
  }

  if (getCheckoutUrl.isError) {
    <FullscreenModalForm request="failed" error="Unexpected error, please try again." />;
  }

  if (verifyEmail.isLoading || !getCheckoutUrl.isSuccess) {
    return <FullscreenModalForm request="ongoing" />;
  }

  window.location.href = getCheckoutUrl.data.url;
  return <FullscreenModalForm request="ongoing" text="Redirecting to trial setup..." />;
};

export default VerifySignupEmail;
