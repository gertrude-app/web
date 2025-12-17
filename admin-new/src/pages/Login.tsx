import { useState } from 'react';
import client from '../api/client';

export default function Login(): React.ReactNode {
  const [email, setEmail] = useState(``);
  const [status, setStatus] = useState<`idle` | `loading` | `sent` | `error`>(`idle`);
  const [errorMsg, setErrorMsg] = useState(``);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setStatus(`loading`);
    setErrorMsg(``);

    const result = await client.requestMagicLink({ email });

    if (result.isSuccess) {
      setStatus(`sent`);
    } else {
      setStatus(`error`);
      setErrorMsg(result.error?.debugMessage ?? `Failed to send magic link`);
    }
  };

  if (status === `sent`) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-600">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <div className="text-6xl mb-4">
            <span role="img" aria-label="mailbox">
              📬
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Check Your Email</h2>
          <p className="text-slate-600">
            If an admin account exists for <strong>{email}</strong>, we've sent a magic
            link. Click the link in the email to sign in.
          </p>
          <button
            onClick={() => {
              setStatus(`idle`);
              setEmail(``);
            }}
            className="mt-6 text-violet-600 hover:text-violet-700 font-medium"
          >
            Try a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-fuchsia-600">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">
          Gertrude Admin
        </h1>
        <p className="text-center text-slate-600 mb-6">
          Enter your email to receive a magic link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          {status === `error` && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === `loading`}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === `loading` ? `Sending...` : `Send Magic Link`}
          </button>
        </form>
      </div>
    </div>
  );
}
