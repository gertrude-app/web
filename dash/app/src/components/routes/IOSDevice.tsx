import { ApiErrorMessage, EditBlockRules, Loading, PageHeading } from '@dash/components';
import { RadioGroup, SelectableListItem } from '@dash/components';
import { SelectMenu } from '@shared/components';
import { notNullish } from '@shared/ts-utils';
import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import type { WebPolicy } from '@dash/types';
import Current from '../../environment';
import { Key, useQuery } from '../../hooks';
import { blockRuleToProps } from '../../lib/block-rule';
import reducer from '../../reducers/ios-device-reducer';

const IOSDevice: React.FC = () => {
  const { deviceId: id = `` } = useParams<{ deviceId: string }>();
  const [state, dispatch] = useReducer(reducer, {
    enabledBlockGroups: [],
    webPolicyDomains: [],
    webPolicy: `blockAll`,
    newDomain: ``,
  });

  const deviceQuery = useQuery(Key.iOSDevice(id), () => Current.api.getIOSDevice(id), {
    onReceive: (data) => dispatch({ type: `receiveData`, data }),
  });

  if (deviceQuery.isPending) {
    return <Loading />;
  }

  if (deviceQuery.isError) {
    return <ApiErrorMessage error={deviceQuery.error} />;
  }

  return (
    <div className="flex flex-col gap-8 [&>*]:w-full">
      <pre>{JSON.stringify(deviceQuery.data.customBlockRules, null, 2)}</pre>
      <pre>
        {JSON.stringify(
          deviceQuery.data.customBlockRules.map((thing) => blockRuleToProps(thing.rule)),
          null,
          2,
        )}
      </pre>
      <PageHeading icon="phone" className="mb-4">
        {deviceQuery.data.childName}’s {deviceQuery.data.deviceType}
      </PageHeading>
      <div className="bg-white rounded-2xl shadow p-6 mx-auto">
        <h2 className="font-bold text-lg mb-4">Block Rules</h2>
        <EditBlockRules
          rules={deviceQuery.data.customBlockRules
            .map((rule) => {
              const props = blockRuleToProps(rule.rule);
              if (!props) return null;
              return [rule.id, props] satisfies [UUID, typeof props];
            })
            .filter(notNullish)}
          onDelete={() => {}}
          onEdit={() => {}}
          onAdd={() => {}}
        />
      </div>
      <div className="bg-white rounded-2xl shadow p-6 mx-auto">
        <h2 className="font-bold text-lg mb-4">Block Groups</h2>
        <div className="space-y-2">
          {deviceQuery.data.allBlockGroups.map(({ id, name }) => (
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
      <div className="bg-white rounded-2xl shadow p-6 mx-auto">
        <h2 className="font-bold text-lg mb-4">Web Content Filter Policy</h2>
        <SelectMenu
          options={WEB_POLICY_OPTIONS}
          selectedOption={state.webPolicy}
          // selected={{
          //   value: state.webPolicy,
          //   display:
          //     WEB_POLICY_OPTIONS.find((opt) => opt.value === state.webPolicy)?.display ||
          //     ``,
          // }}
          setSelected={(policy) => dispatch({ type: `setWebPolicy`, policy })}
        />
      </div>
      <div className="bg-white rounded-2xl shadow p-6 mx-auto">
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

const WEB_POLICY_OPTIONS: { value: WebPolicy; display: string }[] = [
  { value: `blockAllExcept`, display: `Only Approved Websites` },
  { value: `blockAdultAnd`, display: `Blocklist Plus Limit Adult Websites` },
  { value: `blockAdult`, display: `Limit Adult Websites` },
  { value: `blockAll`, display: `Block everything` },
  { value: `allowAll`, display: `Unrestricted` },
] as const;
