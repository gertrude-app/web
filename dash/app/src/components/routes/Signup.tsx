import React, { useState } from 'react';
import { FullscreenModalForm, EmailInputForm } from '@dash/components';
import { Link } from 'react-router-dom';
import { useMutation } from '../../hooks/query';
import Current from '../../environment';

const Signup: React.FC = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const signup = useMutation(`signup`, () => Current.api.signup({ email, password }));

  if (signup.isLoading) {
    return <FullscreenModalForm request="ongoing" />;
  }

  if (signup.isError) {
    return (
      <FullscreenModalForm
        request="failed"
        error="Shucks! Something went wrong, please try again."
      />
    );
  }

  if (signup.isSuccess) {
    return (
      <FullscreenModalForm
        request="succeeded"
        message="Verification email sent! Please check your inbox."
      />
    );
  }

  return (
    <FullscreenModalForm request="idle">
      <EmailInputForm
        title="Signup"
        subTitle={
          <>
            Got an account?{` `}
            <Link
              className="text-violet-700 border-b border-dotted border-violet-700"
              to="/login"
            >
              Login
            </Link>
            {` `}
            instead.
          </>
        }
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={() => signup.mutate(undefined)}
      />
    </FullscreenModalForm>
  );
};

export default Signup;
