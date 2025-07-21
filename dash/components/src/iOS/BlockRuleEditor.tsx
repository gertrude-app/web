import { TextInput } from '@shared/components';
import React from 'react';
import { Combobox, RadioGroup } from '../Forms';

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
  <div className="p-4">
    <TextInput
      label={type === `app` ? `App bundle ID:` : `Address fragment`}
      type="text"
      placeholder="com.acme.app"
      value={primaryValue}
      setValue={(value) => emit({ type: `setPrimaryValue`, value })}
    />
    <div className="flex gap-4">
      <RadioGroup
        options={[
          { value: `app`, display: `Block app` },
          { value: `address`, display: `Block address` },
        ]}
        selectedOption={type}
        setSelectedOption={(value) => emit({ type: `setType`, value })}
      />
      <Combobox
        options={getConditionOpts(type)}
        selected={
          getConditionOpts(type).find((opt) => opt.value === condition) ?? {
            value: `always`,
            display: `Always`,
          }
        }
        setSelected={(value) => emit({ type: `setCondition`, value })}
      />
    </div>
    {condition === `unlessAddressContains` && (
      <TextInput
        type="textarea"
        value={secondaryValue}
        setValue={(value) => emit({ type: `setSecondaryValue`, value })}
        placeholder="foo.com\nbar.com"
      />
    )}
    {condition === `whenAddressContains` && (
      <TextInput
        type="text"
        value={secondaryValue}
        setValue={(value) => emit({ type: `setSecondaryValue`, value })}
        placeholder="bad-site.com"
      />
    )}
  </div>
);

export default BlockRuleEditor;

function getConditionOpts(
  type: `app` | `address`,
): Array<{ value: Condition; display: string }> {
  if (type === `app`) {
    return [
      { value: `always`, display: `Always` },
      { value: `whenAddressContains`, display: `When address contains...` },
      { value: `whenIsBrowser`, display: `When is browser` },
      { value: `unlessAddressContains`, display: `Unless address contains...` },
    ];
  }
  return [
    { value: `always`, display: `Always` },
    { value: `whenIsBrowser`, display: `When is browser` },
  ];
}

/*
block app - always
block app - only when (hostname contains X)
block app - only when (flowType = browser)
block app - unless (hostname contains any of Xs) (maybe obseleted by managed settings? maybe not, used for podtrude)

block address - always
block address - only when (flowtype = browser) (???)
*/
