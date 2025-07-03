import { ApiErrorMessage, Loading, PageHeading } from '@dash/components';
import { RadioGroup, SelectableListItem } from '@dash/components';
import { produce } from 'immer';
import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Current from '../../environment';
import { Key, useQuery } from '../../hooks';

const WEB_POLICY_OPTIONS: { value: WebPolicy; display: string }[] = [
  { value: `blockAllExcept`, display: `Only Approved Websites` },
  { value: `blockAdultAnd`, display: `Blocklist Plus Limit Adult Websites` },
  { value: `blockAdult`, display: `Limit Adult Websites` },
  { value: `blockAll`, display: `Block everything` },
  { value: `allowAll`, display: `Unrestricted` },
];

type WebPolicy =
  | `allowAll`
  | `blockAdult`
  | `blockAdultAnd`
  | `blockAllExcept`
  | `blockAll`;

interface Output {
  childName: string;
  deviceType: string;
  osVersion: string;
  allBlockGroups: Array<{
    id: UUID;
    name: string;
  }>;
  enabledBlockGroups: UUID[];
  webPolicy: string;
  webPolicyDomains: string[];
}

type State = {
  enabledBlockGroups: UUID[];
  webPolicy: WebPolicy;
  webPolicyDomains: string[];
  newDomain: string;
};

type Action =
  | { type: `toggleBlockGroup`; id: UUID }
  | { type: `setWebPolicy`; policy: WebPolicy }
  | { type: `setNewDomain`; value: string }
  | { type: `addDomain` }
  | { type: `removeDomain`; domain: string }
  | { type: `setAll`; data: Output };

function baseReducer(state: State, action: Action): void {
  switch (action.type) {
    case `toggleBlockGroup`: {
      const idx = state.enabledBlockGroups.indexOf(action.id);
      if (idx === -1) {
        state.enabledBlockGroups.push(action.id);
      } else {
        state.enabledBlockGroups.splice(idx, 1);
      }
      return;
    }
    case `setWebPolicy`:
      state.webPolicy = action.policy;
      return;
    case `setNewDomain`:
      state.newDomain = action.value;
      return;
    case `addDomain`: {
      const domain = state.newDomain.trim();
      if (domain && !state.webPolicyDomains.includes(domain)) {
        state.webPolicyDomains.push(domain);
        state.newDomain = ``;
      }
      return;
    }
    case `removeDomain`:
      state.webPolicyDomains = state.webPolicyDomains.filter((d) => d !== action.domain);
      return;
    case `setAll`:
      state.enabledBlockGroups = [...action.data.enabledBlockGroups];
      state.webPolicy = action.data.webPolicy as WebPolicy;
      state.webPolicyDomains = [...action.data.webPolicyDomains];
      state.newDomain = ``;
      return;
  }
}

const reducer = produce(baseReducer);

const IOSDevice: React.FC = () => {
  const { deviceId: id = `` } = useParams<{ deviceId: string }>();
  const deviceQuery = useQuery(Key.iOSDevice(id), () => Current.api.getIOSDevice(id));

  const data: Output = {
    childName: `Harriet`,
    deviceType: `iPhone`,
    osVersion: `17.0.1`,
    allBlockGroups: [
      { id: `1`, name: `GIFs` },
      { id: `2`, name: `Apple Maps images` },
      { id: `3`, name: `AI features` },
      { id: `4`, name: `App store images` },
      { id: `5`, name: `Spotlight` },
      { id: `6`, name: `Ads` },
      { id: `7`, name: `WhatsApp` },
      { id: `8`, name: `apple.com` },
    ],
    enabledBlockGroups: [`1`, `2`, `3`, `4`, `5`, `6`, `8`],
    webPolicy: `blockAllExcept`,
    webPolicyDomains: [`apple.com`, `google.com`],
  };

  const [state, dispatch] = useReducer(reducer, {
    enabledBlockGroups: data.enabledBlockGroups,
    webPolicy: data.webPolicy as WebPolicy,
    webPolicyDomains: [...data.webPolicyDomains],
    newDomain: ``,
  });

  if (deviceQuery.isPending) {
    return <Loading />;
  }

  if (deviceQuery.isError) {
    return <ApiErrorMessage error={deviceQuery.error} />;
  }

  return (
    <div>
      <PageHeading icon="phone" className="mb-4">
        {data.childName}’s {data.deviceType}
      </PageHeading>
      <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto mb-8">
        <h2 className="font-bold text-lg mb-4">Block Groups</h2>
        <div className="space-y-2">
          {data.allBlockGroups.map(({ id, name }) => (
            <SelectableListItem
              key={id}
              title={name}
              description={``}
              selected={state.enabledBlockGroups.includes(id)}
              onClick={() => dispatch({ type: `toggleBlockGroup`, id })}
            />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto">
        <h2 className="font-bold text-lg mb-4">Web Content Filter Policy</h2>
        <RadioGroup
          options={WEB_POLICY_OPTIONS}
          selectedOption={state.webPolicy}
          setSelectedOption={(val: string) =>
            dispatch({ type: `setWebPolicy`, policy: val as WebPolicy })
          }
        />
      </div>
      <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto mt-8">
        <h2 className="font-bold text-lg mb-4">Allowed Domains</h2>
        <div className="flex flex-col gap-2 mb-4">
          {state.webPolicyDomains.map((domain: string) => (
            <div
              key={domain}
              className="flex items-center justify-between bg-slate-100 rounded-lg px-3 py-2"
            >
              <span className="font-mono text-slate-700">{domain}</span>
              <button
                className="text-red-500 hover:text-red-700 font-bold px-2"
                onClick={() => dispatch({ type: `removeDomain`, domain })}
                aria-label={`Remove ${domain}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300"
            placeholder="Add domain (e.g. example.com)"
            value={state.newDomain}
            onChange={(e) => dispatch({ type: `setNewDomain`, value: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === `Enter`) {
                e.preventDefault();
                dispatch({ type: `addDomain` });
              }
            }}
          />
          <button
            className="bg-violet-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-violet-700 transition"
            onClick={() => dispatch({ type: `addDomain` })}
            disabled={
              !state.newDomain.trim() ||
              state.webPolicyDomains.includes(state.newDomain.trim())
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default IOSDevice;
