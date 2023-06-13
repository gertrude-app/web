import React, { useState } from 'react';
import { ApiErrorMessage, FullscreenModalForm, LoginForm } from '@dash/components';
import { Navigate } from 'react-router-dom';
import useLoginRedirect from '../../hooks/login-redirect';
import { useAuth } from '../../hooks/auth';
import { useMutation } from '../../hooks/query';
import Current from '../../environment';

export const Login: React.FC = () => {
  const { admin } = useAuth();
  const redirectUrl = useLoginRedirect();
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);

  const login = useMutation(() => Current.api.login({ email, password }));
  const requestMagicLink = useMutation(() => Current.api.requestMagicLink({ email }));

  if (admin !== null || login.isSuccess) {
    return <Navigate to={redirectUrl ?? `/`} replace />;
  }

  if (login.isLoading || requestMagicLink.isLoading) {
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

  if (login.isError || requestMagicLink.isError) {
    return (
      <FullscreenModalForm
        request="failed"
        error={
          <ApiErrorMessage
            wrapped={false}
            error={login.error ?? requestMagicLink.error ?? undefined}
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
        onSubmit={() => login.mutate(undefined)}
        onSendMagicLink={() => requestMagicLink.mutate(undefined)}
      />
    </FullscreenModalForm>
  );
};

export default Login;
