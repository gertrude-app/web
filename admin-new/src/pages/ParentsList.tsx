import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import client, { type ParentsListOutput } from '../api/client';

export default function ParentsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get(`page`) ?? `1`, 10);

  const [data, setData] = useState<ParentsListOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const result = await client.parentsList({ page, pageSize: 30 });

      if (result.isError) {
        setError(result.error?.debugMessage ?? `Failed to load parents`);
        setLoading(false);
        return;
      }

      setData(result.value ?? null);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  const goToPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-slate-600">Loading parents...</div>
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Parents</h1>
        <div className="text-sm text-slate-600">
          {data.totalCount.toLocaleString()} total parents
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                Email
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                Status
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                Subscription
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">
                Kids
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">
                Keychains
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">
                Notifs
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.parents.map((parent) => (
              <tr key={parent.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <Link
                    to={`/parents/${parent.id}`}
                    className="text-violet-600 hover:text-violet-700 font-medium"
                  >
                    {parent.email}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={parent.status} />
                </td>
                <td className="px-4 py-3">
                  <SubscriptionBadge status={parent.subscriptionStatus} />
                </td>
                <td className="px-4 py-3 text-center text-slate-600">
                  {parent.numChildren}
                </td>
                <td className="px-4 py-3 text-center text-slate-600">
                  {parent.numKeychains}
                </td>
                <td className="px-4 py-3 text-center text-slate-600">
                  {parent.numNotifications}
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {formatDate(parent.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={data.page}
        totalPages={data.totalPages}
        onPageChange={goToPage}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: `bg-green-100 text-green-800`,
    onboarded: `bg-blue-100 text-blue-800`,
    no_action: `bg-slate-100 text-slate-600`,
    unknown: `bg-slate-100 text-slate-600`,
  };

  const labels: Record<string, string> = {
    active: `Active`,
    onboarded: `Onboarded`,
    no_action: `No Action`,
    unknown: `Unknown`,
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] ?? styles.unknown}`}>
      {labels[status] ?? status}
    </span>
  );
}

function SubscriptionBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    paid: `bg-green-100 text-green-800`,
    trialing: `bg-blue-100 text-blue-800`,
    overdue: `bg-yellow-100 text-yellow-800`,
    unpaid: `bg-red-100 text-red-800`,
    pendingEmailVerification: `bg-slate-100 text-slate-600`,
    complimentary: `bg-purple-100 text-purple-800`,
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] ?? `bg-slate-100 text-slate-600`}`}>
      {status}
    </span>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
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
