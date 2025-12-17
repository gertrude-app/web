import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client, {
  type IOSOverviewOutput,
  type MacOverviewOutput,
  type PodcastOverviewOutput,
} from '../api/client';

export default function Dashboard(): React.ReactNode {
  const [macData, setMacData] = useState<MacOverviewOutput | null>(null);
  const [iosData, setIosData] = useState<IOSOverviewOutput | null>(null);
  const [podcastData, setPodcastData] = useState<PodcastOverviewOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      const [macResult, iosResult, podcastResult] = await Promise.all([
        client.macOverview(),
        client.iOSOverview(),
        client.podcastOverview(),
      ]);

      if (macResult.isError) {
        setError(macResult.error?.debugMessage ?? `Failed to load Mac data`);
        setLoading(false);
        return;
      }

      setMacData(macResult.value ?? null);
      setIosData(iosResult.value ?? null);
      setPodcastData(podcastResult.value ?? null);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-slate-600">Loading dashboard...</div>
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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>

      {macData && <MacSection data={macData} />}
      {iosData && <IOSSection data={iosData} />}
      {podcastData && <PodcastSection data={podcastData} />}
    </div>
  );
}

function MacSection({ data }: { data: MacOverviewOutput }): React.ReactNode {
  const stats = [
    { label: `Annual Revenue`, value: `$${data.annualRevenue.toLocaleString()}` },
    { label: `Paying Parents`, value: data.payingParents.toLocaleString() },
    { label: `Active Parents`, value: data.activeParents.toLocaleString() },
    { label: `Children (Active)`, value: data.childrenOfActiveParents.toLocaleString() },
    { label: `All-Time Signups`, value: data.allTimeSignups.toLocaleString() },
    { label: `All-Time Children`, value: data.allTimeChildren.toLocaleString() },
    { label: `All-Time Installs`, value: data.allTimeAppInstallations.toLocaleString() },
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Mac App</h2>
        <Link
          to="/parents"
          className="text-violet-600 hover:text-violet-700 text-sm font-medium"
        >
          View Parents →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-violet-600">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IOSSection({ data }: { data: IOSOverviewOutput }): React.ReactNode {
  const total = data.firstLaunches;
  const authPct = total > 0 ? (data.authorizationSuccesses / total) * 100 : 0;
  const installPct = total > 0 ? (data.filterInstallSuccesses / total) * 100 : 0;

  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">iOS App</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {data.firstLaunches.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600">First Launches</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {data.authorizationSuccesses.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600">Auth Successes</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {data.filterInstallSuccesses.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600">Filter Installs</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {data.conversionRate.toFixed(1)}%
          </div>
          <div className="text-sm text-slate-600">Conversion Rate</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-slate-700">Onboarding Funnel</h3>
        <FunnelBar label="First Launch" value={100} color="bg-blue-500" />
        <FunnelBar label="Authorization" value={authPct} color="bg-blue-400" />
        <FunnelBar label="Filter Install" value={installPct} color="bg-blue-300" />
      </div>
    </section>
  );
}

function FunnelBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}): React.ReactNode {
  return (
    <div className="flex items-center gap-4">
      <div className="w-28 text-sm text-slate-600">{label}</div>
      <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="w-16 text-right text-sm font-medium text-slate-700">
        {value.toFixed(1)}%
      </div>
    </div>
  );
}

function PodcastSection({ data }: { data: PodcastOverviewOutput }): React.ReactNode {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Podcast App</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {data.totalInstalls.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600">Total Installs</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {data.successfulSubscriptions.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600">Subscriptions</div>
        </div>
      </div>
    </section>
  );
}
