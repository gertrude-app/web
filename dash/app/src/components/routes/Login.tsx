import React, { useState } from 'react';
import { ApiErrorMessage, FullscreenModalForm, LoginForm } from '@dash/components';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useMutation, useLoginRedirect } from '../../hooks';
import Current from '../../environment';

export const Login: React.FC = () => {
  const { admin, login } = useAuth();
  const redirectUrl = useLoginRedirect();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [searchParams] = useSearchParams();
  const fromPage = searchParams.get(`from`);

  const requestMagicLink = useMutation(() =>
    Current.api.requestMagicLink({
      email,
      redirect: new URLSearchParams(window.location.search).get(`redirect`) ?? undefined,
    }),
  );

  const loginMutation = useMutation(() => Current.api.login({ email, password }), {
    onSuccess: ({ adminId, token }) => login(adminId, token),
  });

  if (admin !== null || loginMutation.isSuccess) {
    return <Navigate to={redirectUrl ?? `/`} replace />;
  }

  if (loginMutation.isLoading || requestMagicLink.isLoading) {
    return <FullscreenModalForm request="ongoing" />;
  }

  if (requestMagicLink.isSuccess) {
    return (
      <FullscreenModalForm
        request="succeeded"
        message="Check your email for a magic link."
      />
    );
  }

  if (loginMutation.isError || requestMagicLink.isError) {
    return (
      <FullscreenModalForm
        request="failed"
        error={
          <ApiErrorMessage
            wrapped={false}
            error={loginMutation.error ?? requestMagicLink.error ?? undefined}
          />
        }
      />
    );
  }

  return (
    <FullscreenModalForm request="idle">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={() => loginMutation.mutate(undefined)}
        onSendMagicLink={() => requestMagicLink.mutate(undefined)}
        fromPasswordReset={fromPage === `reset`}
      />
    </FullscreenModalForm>
  );
};

export default Login;
