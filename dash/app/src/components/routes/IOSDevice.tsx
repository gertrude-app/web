import { convert, validate } from '@dash/block-rules';
import {
  BlockRuleEditor,
  EditBlockRules,
  Loading,
  PageHeading,
  TrashBtn,
} from '@dash/components';
import { ApiErrorMessage, ConfirmDeleteEntity } from '@dash/components';
import { Modal, SelectableListItem } from '@dash/components';
import { Result } from '@dash/types';
import { Button, SelectMenu } from '@shared/components';
import { notNullish } from '@shared/ts-utils';
import isEqual from 'lodash.isequal';
import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import type { WebPolicy } from '@dash/types';
import Current from '../../environment';
import { Key, useConfirmableDelete, useMutation, useQuery } from '../../hooks';
import reducer from '../../reducers/ios-device-reducer';

const IOSDevice: React.FC = () => {
  const { deviceId: id = `` } = useParams<{ deviceId: string }>();
  const [state, dispatch] = useReducer(reducer, {
    enabledBlockGroups: [],
    webPolicyDomains: [],
    webPolicy: `blockAll`,
    newDomain: ``,
  });

  const deleteBlockRule = useConfirmableDelete(`blockRule`, {
    invalidating: [Key.iOSDevice(id)],
  });

  const saveBlockRule = useMutation(
    () => {
      const editingBlockRule = state.editingBlockRule;
      if (!editingBlockRule) return Result.resolveUnexpected(`fb05188d`);
      return Current.api.upsertBlockRule({
        id: editingBlockRule.id,
        deviceId: id,
        rule: convert.propsToBlockRule(editingBlockRule),
      });
    },
    {
      toast: `save:block-rule`,
      invalidating: [Key.iOSDevice(id)],
      onSuccess: () => dispatch({ type: `dismissBlockRule` }),
    },
  );

  const saveDevice = useMutation(
    () =>
      Current.api.updateIOSDevice({
        deviceId: id,
        enabledBlockGroups: state.enabledBlockGroups,
        webPolicy: state.webPolicy,
        webPolicyDomains: state.webPolicyDomains,
      }),
    { toast: `save:ios-device`, invalidating: [Key.iOSDevice(id)] },
  );

  const deviceQuery = useQuery(Key.iOSDevice(id), () => Current.api.getIOSDevice(id), {
    onReceive: (data) => dispatch({ type: `receiveData`, data }),
  });

  if (deviceQuery.isPending) {
    return <Loading />;
  }

  if (deviceQuery.isError) {
    return <ApiErrorMessage error={deviceQuery.error} />;
  }

  const isDirty =
    isEqual(state.enabledBlockGroups, deviceQuery.data.enabledBlockGroups) &&
    state.webPolicy === deviceQuery.data.webPolicy &&
    isEqual(state.webPolicyDomains, deviceQuery.data.webPolicyDomains);

  return (
    <div className="flex flex-col gap-8 [&>*]:w-full">
      <PageHeading icon="phone" className="mb-4">
        {deviceQuery.data.childName}’s {deviceQuery.data.deviceType}
      </PageHeading>
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
          setSelected={(policy) => dispatch({ type: `setWebPolicy`, policy })}
        />

        {(state.webPolicy === `blockAllExcept` ||
          state.webPolicy === `blockAdultAnd`) && (
          <div className="ml-12 mt-6">
            <h3 className="font-semibold text-base mb-1">
              {state.webPolicy === `blockAllExcept` ? `Approved` : `Blocked`} websites:
            </h3>
            {state.webPolicyDomains.length > 0 && (
              <div className="flex flex-col gap-2 mb-3">
                {state.webPolicyDomains.map((domain: string) => (
                  <div
                    key={domain}
                    className="flex items-center justify-between bg-slate-100 rounded-lg px-3 py-2"
                  >
                    <span className="font-mono text-violet-700">{domain}</span>
                    <TrashBtn
                      onClick={() => dispatch({ type: `removeDomain`, domain })}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300"
                placeholder="Add domain (e.g. example.com)"
                value={state.newDomain}
                onChange={(e) =>
                  dispatch({ type: `setNewDomain`, value: e.target.value })
                }
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
        )}
      </div>
      <div className="bg-white rounded-2xl shadow p-6 mx-auto">
        <h2 className="font-bold text-lg mb-4">Block Rules</h2>
        <EditBlockRules
          rules={deviceQuery.data.customBlockRules
            .map((rule) => {
              const props = convert.blockRuleToProps(rule.rule);
              if (!props) return null;
              return [rule.id, props] satisfies [UUID, typeof props];
            })
            .filter(notNullish)}
          onDelete={deleteBlockRule.start}
          onEdit={(id) => {
            const rule = deviceQuery.data.customBlockRules.find((r) => r.id === id);
            if (rule) {
              const props = convert.blockRuleToProps(rule.rule);
              if (props) {
                dispatch({ type: `setEditingBlockRule`, id, rule: props });
              }
            }
          }}
          onAdd={() => dispatch({ type: `addBlockRule` })}
        />
      </div>
      <div className="flex justify-end border-slate-200">
        <Button
          className="ScrollTop"
          type="button"
          disabled={isDirty || saveDevice.isPending}
          onClick={() => saveDevice.mutate(undefined)}
          color="primary"
        >
          Save settings
        </Button>
      </div>
      <Modal
        icon="location"
        type="container"
        maximizeWidthForSmallScreens
        title={state.editingBlockRule?.id ? `Edit Block Rule` : `Create Block Rule`}
        isOpen={!!state.editingBlockRule}
        primaryButton={{
          label: state.editingBlockRule?.id ? `Save` : `Create`,
          action: () => {
            saveBlockRule.mutate(undefined);
          },
          disabled:
            !state.editingBlockRule ||
            !validate.blockRuleProps(state.editingBlockRule) ||
            saveBlockRule.isPending,
        }}
        secondaryButton={{ action: () => dispatch({ type: `dismissBlockRule` }) }}
      >
        {state.editingBlockRule && (
          <BlockRuleEditor
            {...state.editingBlockRule}
            emit={(event) => dispatch({ type: `editBlockRule`, event })}
          />
        )}
      </Modal>
      <ConfirmDeleteEntity type="block rule" action={deleteBlockRule} />
    </div>
  );
};

export default IOSDevice;

const WEB_POLICY_OPTIONS: { value: WebPolicy; display: string }[] = [
  { value: `blockAllExcept`, display: `Only approved websites` },
  { value: `blockAdultAnd`, display: `Blocklist plus limit adult websites` },
  { value: `blockAdult`, display: `Limit adult websites` },
  { value: `blockAll`, display: `Block everything` },
  { value: `allowAll`, display: `Unrestricted` },
] as const;
