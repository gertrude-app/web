import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../api/client';

interface VerifyTokenProps {
  onLogin: (token: string) => void;
}

export default function VerifyToken({ onLogin }: VerifyTokenProps): React.ReactNode {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<`verifying` | `error`>(`verifying`);
  const [errorMsg, setErrorMsg] = useState(``);

  useEffect(() => {
    if (!token) {
      setStatus(`error`);
      setErrorMsg(`No token provided`);
      return;
    }

    const verifyToken = async (): Promise<void> => {
      const result = await client.verifyMagicLink({ token });

      if (result.isSuccess && result.value) {
        onLogin(result.value.token);
        navigate(`/`, { replace: true });
      } else {
        setStatus(`error`);
        setErrorMsg(result.error?.debugMessage ?? `Invalid or expired magic link`);
      }
    };

    verifyToken();
  }, [token, onLogin, navigate]);

  if (status === `verifying`) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-600">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <div className="animate-spin text-4xl mb-4">
            <span role="img" aria-label="loading">
              ⏳
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Verifying...</h2>
          <p className="text-slate-600 mt-2">
            Please wait while we verify your magic link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-600">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="text-6xl mb-4">
          <span role="img" aria-label="error">
            ❌
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Verification Failed</h2>
        <p className="text-slate-600 mt-2">{errorMsg}</p>
        <button
          onClick={() => navigate(`/`, { replace: true })}
          className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
