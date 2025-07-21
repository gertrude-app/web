import { TextInput } from '@shared/components';
import React from 'react';
import { RadioGroup } from '../Forms';

export type Props = {
  type: `app` | `address`;
  primaryValue: string;
  secondaryValue: string;
  condition: Condition;
  emit: (event: Event) => unknown;
};

export type Condition =
  | `always`
  | `whenAddressContains`
  | `whenIsBrowser`
  | `unlessAddressContains`;

export type Event =
  | { type: `setPrimaryValue`; value: string }
  | { type: `setSecondaryValue`; value: string }
  | { type: `setType`; value: `app` | `address` }
  | { type: `setCondition`; value: Condition };

const BlockRuleEditor: React.FC<Props> = ({
  type,
  primaryValue,
  secondaryValue,
  condition,
  emit,
}) => (
  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 *max-w-xl mx-auto flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <RadioGroup
        options={[
          { value: `app`, display: `Block app` },
          { value: `address`, display: `Block address` },
        ]}
        selectedOption={type}
        setSelectedOption={(value) => emit({ type: `setType`, value })}
      />
    </div>

    <div className="flex flex-col gap-2">
      <TextInput
        type="text"
        placeholder={type === `app` ? `e.g. com.acme.app` : `e.g. example.com`}
        value={primaryValue}
        setValue={(value) => emit({ type: `setPrimaryValue`, value })}
        className="w-full"
      />
    </div>

    <div className="flex flex-col gap-2">
      <RadioGroup
        options={getConditionOpts(type)}
        selectedOption={condition}
        setSelectedOption={(value) => emit({ type: `setCondition`, value })}
      />
    </div>

    {(condition === `unlessAddressContains` || condition === `whenAddressContains`) && (
      <div className="flex flex-col gap-2 bg-violet-50 border border-violet-100 rounded-xl p-4">
        <TextInput
          type={condition === `unlessAddressContains` ? `textarea` : `text`}
          value={secondaryValue}
          setValue={(value) => emit({ type: `setSecondaryValue`, value })}
          placeholder={
            condition === `unlessAddressContains` ? `foo.com\nbar.com` : `bad-site.com`
          }
          className="w-full"
        />
        {condition === `unlessAddressContains` && (
          <span className="text-xs text-slate-500 mt-1">Enter one address per line.</span>
        )}
      </div>
    )}
  </div>
);

export default BlockRuleEditor;

function getConditionOpts(
  type: `app` | `address`,
): Array<{ value: Condition; display: string }> {
  if (type === `app`) {
    return [
      { value: `always`, display: `Block always` },
      { value: `whenAddressContains`, display: `Block when address contains...` },
      { value: `whenIsBrowser`, display: `Block when is browser` },
      { value: `unlessAddressContains`, display: `Block unless address contains...` },
    ];
  }
  return [
    { value: `always`, display: `Block always` },
    { value: `whenIsBrowser`, display: `Block when is browser` },
  ];
}
