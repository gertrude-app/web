import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import client, { type ParentDetailOutput } from '../api/client';

export default function ParentDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ParentDetailOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const result = await client.parentDetail({ id });

      if (result.isError) {
        setError(result.error?.debugMessage ?? `Failed to load parent`);
        setLoading(false);
        return;
      }

      setData(result.value ?? null);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-slate-600">Loading parent details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/parents"
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          ← Back to Parents
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{data.email}</h1>
            <p className="text-sm text-slate-500 mt-1">ID: {data.id}</p>
          </div>
          <SubscriptionBadge status={data.subscriptionStatus} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <InfoCard label="Subscription" value={data.subscriptionStatus} />
          <InfoCard
            label="Monthly Price"
            value={`$${(data.monthlyPriceInCents / 100).toFixed(2)}`}
          />
          <InfoCard label="Children" value={data.children.length.toString()} />
          <InfoCard label="Created" value={formatDate(data.createdAt)} />
        </div>

        {data.subscriptionId && (
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <span className="text-sm text-slate-600">Stripe ID: </span>
            <code className="text-sm text-slate-800">{data.subscriptionId}</code>
          </div>
        )}
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Children ({data.children.length})
        </h2>
        {data.children.length === 0 ? (
          <p className="text-slate-600">No children configured</p>
        ) : (
          <div className="space-y-4">
            {data.children.map((child) => (
              <div
                key={child.id}
                className="border border-slate-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">{child.name}</h3>
                  <div className="flex gap-2">
                    {child.keyloggingEnabled && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        Keylogging
                      </span>
                    )}
                    {child.screenshotsEnabled && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Screenshots
                      </span>
                    )}
                  </div>
                </div>

                {child.installations.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">
                      Installations ({child.installations.length})
                    </h4>
                    <div className="grid gap-2">
                      {child.installations.map((install) => (
                        <div
                          key={install.id}
                          className="bg-slate-50 rounded p-3 text-sm"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {install.modelIdentifier ?? `Unknown Device`}
                            </span>
                            <span className="text-slate-500">
                              {formatDate(install.createdAt)}
                            </span>
                          </div>
                          <div className="text-slate-600 mt-1">
                            App: {install.appVersion}
                            {install.filterVersion && ` | Filter: ${install.filterVersion}`}
                            {install.osVersion && ` | macOS: ${install.osVersion}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Keychains ({data.keychains.length})
        </h2>
        {data.keychains.length === 0 ? (
          <p className="text-slate-600">No keychains configured</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.keychains.map((keychain) => (
              <div
                key={keychain.id}
                className="border border-slate-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">
                    {keychain.name}
                  </span>
                  {keychain.isPublic && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      Public
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-600 mt-1">
                  {keychain.numKeys} keys
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Notifications ({data.notifications.length})
        </h2>
        {data.notifications.length === 0 ? (
          <p className="text-slate-600">No notifications configured</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.notifications.map((notif) => (
              <span
                key={notif.id}
                className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
              >
                {notif.trigger}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-lg p-4">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-lg font-semibold text-slate-800 mt-1">{value}</div>
    </div>
  );
}

function SubscriptionBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: `bg-green-100 text-green-800`,
    trialing: `bg-blue-100 text-blue-800`,
    overdue: `bg-yellow-100 text-yellow-800`,
    unpaid: `bg-red-100 text-red-800`,
    complimentary: `bg-purple-100 text-purple-800`,
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        styles[status] ?? `bg-slate-100 text-slate-600`
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(`en-US`, {
    year: `numeric`,
    month: `short`,
    day: `numeric`,
  });
}
